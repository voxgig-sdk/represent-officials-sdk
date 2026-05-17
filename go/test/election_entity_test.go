package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/represent-officials-sdk/go"
	"github.com/voxgig-sdk/represent-officials-sdk/go/core"

	vs "github.com/voxgig-sdk/represent-officials-sdk/go/utility/struct"
)

func TestElectionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Election(nil)
		if ent == nil {
			t.Fatal("expected non-nil ElectionEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := electionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "election." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set REPRESENTOFFICIALS_TEST_ELECTION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		electionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.election", setup.data)))
		var electionRef01Data map[string]any
		if len(electionRef01DataRaw) > 0 {
			electionRef01Data = core.ToMapAny(electionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = electionRef01Data

		// LIST
		electionRef01Ent := client.Election(nil)
		electionRef01Match := map[string]any{}

		electionRef01ListResult, err := electionRef01Ent.List(electionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, electionRef01ListOk := electionRef01ListResult.([]any)
		if !electionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", electionRef01ListResult)
		}

	})
}

func electionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "election", "ElectionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read election test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse election test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"election01", "election02", "election03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("REPRESENTOFFICIALS_TEST_ELECTION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"REPRESENTOFFICIALS_TEST_ELECTION_ENTID": idmap,
		"REPRESENTOFFICIALS_TEST_LIVE":      "FALSE",
		"REPRESENTOFFICIALS_TEST_EXPLAIN":   "FALSE",
		"REPRESENTOFFICIALS_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["REPRESENTOFFICIALS_TEST_ELECTION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["REPRESENTOFFICIALS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["REPRESENTOFFICIALS_APIKEY"],
			},
			extra,
		})
		client = sdk.NewRepresentOfficialsSDK(core.ToMapAny(mergedOpts))
	}

	live := env["REPRESENTOFFICIALS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["REPRESENTOFFICIALS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
