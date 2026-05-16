package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/represent-officials-sdk"
	"github.com/voxgig-sdk/represent-officials-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestBoundaryEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Boundary(nil)
		if ent == nil {
			t.Fatal("expected non-nil BoundaryEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := boundaryBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "boundary." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set REPRESENTOFFICIALS_TEST_BOUNDARY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		boundaryRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.boundary", setup.data)))
		var boundaryRef01Data map[string]any
		if len(boundaryRef01DataRaw) > 0 {
			boundaryRef01Data = core.ToMapAny(boundaryRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = boundaryRef01Data

		// LIST
		boundaryRef01Ent := client.Boundary(nil)
		boundaryRef01Match := map[string]any{}

		boundaryRef01ListResult, err := boundaryRef01Ent.List(boundaryRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, boundaryRef01ListOk := boundaryRef01ListResult.([]any)
		if !boundaryRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", boundaryRef01ListResult)
		}

		// LOAD
		boundaryRef01MatchDt0 := map[string]any{}
		boundaryRef01DataDt0Loaded, err := boundaryRef01Ent.Load(boundaryRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if boundaryRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func boundaryBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "boundary", "BoundaryTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read boundary test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse boundary test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"boundary01", "boundary02", "boundary03"},
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
	entidEnvRaw := os.Getenv("REPRESENTOFFICIALS_TEST_BOUNDARY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"REPRESENTOFFICIALS_TEST_BOUNDARY_ENTID": idmap,
		"REPRESENTOFFICIALS_TEST_LIVE":      "FALSE",
		"REPRESENTOFFICIALS_TEST_EXPLAIN":   "FALSE",
		"REPRESENTOFFICIALS_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["REPRESENTOFFICIALS_TEST_BOUNDARY_ENTID"])
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
