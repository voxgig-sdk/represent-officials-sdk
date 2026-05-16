# BoundarySet entity test

require "minitest/autorun"
require "json"
require_relative "../RepresentOfficials_sdk"
require_relative "runner"

class BoundarySetEntityTest < Minitest::Test
  def test_create_instance
    testsdk = RepresentOfficialsSDK.test(nil, nil)
    ent = testsdk.BoundarySet(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = boundary_set_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "boundary_set." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set REPRESENTOFFICIALS_TEST_BOUNDARY_SET_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    boundary_set_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.boundary_set")))
    boundary_set_ref01_data = nil
    if boundary_set_ref01_data_raw.length > 0
      boundary_set_ref01_data = Helpers.to_map(boundary_set_ref01_data_raw[0][1])
    end

    # LIST
    boundary_set_ref01_ent = client.BoundarySet(nil)
    boundary_set_ref01_match = {}

    boundary_set_ref01_list_result, err = boundary_set_ref01_ent.list(boundary_set_ref01_match, nil)
    assert_nil err
    assert boundary_set_ref01_list_result.is_a?(Array)

    # LOAD
    boundary_set_ref01_match_dt0 = {}
    boundary_set_ref01_data_dt0_loaded, err = boundary_set_ref01_ent.load(boundary_set_ref01_match_dt0, nil)
    assert_nil err
    assert !boundary_set_ref01_data_dt0_loaded.nil?

  end
end

def boundary_set_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "boundary_set", "BoundarySetTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = RepresentOfficialsSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["boundary_set01", "boundary_set02", "boundary_set03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["REPRESENTOFFICIALS_TEST_BOUNDARY_SET_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "REPRESENTOFFICIALS_TEST_BOUNDARY_SET_ENTID" => idmap,
    "REPRESENTOFFICIALS_TEST_LIVE" => "FALSE",
    "REPRESENTOFFICIALS_TEST_EXPLAIN" => "FALSE",
    "REPRESENTOFFICIALS_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["REPRESENTOFFICIALS_TEST_BOUNDARY_SET_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["REPRESENTOFFICIALS_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["REPRESENTOFFICIALS_APIKEY"],
      },
      extra || {},
    ])
    client = RepresentOfficialsSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["REPRESENTOFFICIALS_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["REPRESENTOFFICIALS_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
