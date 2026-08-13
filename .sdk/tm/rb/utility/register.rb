# RepresentOfficials SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

RepresentOfficialsUtility.registrar = ->(u) {
  u.clean = RepresentOfficialsUtilities::Clean
  u.done = RepresentOfficialsUtilities::Done
  u.make_error = RepresentOfficialsUtilities::MakeError
  u.feature_add = RepresentOfficialsUtilities::FeatureAdd
  u.feature_hook = RepresentOfficialsUtilities::FeatureHook
  u.feature_init = RepresentOfficialsUtilities::FeatureInit
  u.fetcher = RepresentOfficialsUtilities::Fetcher
  u.make_fetch_def = RepresentOfficialsUtilities::MakeFetchDef
  u.make_context = RepresentOfficialsUtilities::MakeContext
  u.make_options = RepresentOfficialsUtilities::MakeOptions
  u.make_request = RepresentOfficialsUtilities::MakeRequest
  u.make_response = RepresentOfficialsUtilities::MakeResponse
  u.make_result = RepresentOfficialsUtilities::MakeResult
  u.make_point = RepresentOfficialsUtilities::MakePoint
  u.make_spec = RepresentOfficialsUtilities::MakeSpec
  u.make_url = RepresentOfficialsUtilities::MakeUrl
  u.param = RepresentOfficialsUtilities::Param
  u.prepare_auth = RepresentOfficialsUtilities::PrepareAuth
  u.prepare_body = RepresentOfficialsUtilities::PrepareBody
  u.prepare_headers = RepresentOfficialsUtilities::PrepareHeaders
  u.prepare_method = RepresentOfficialsUtilities::PrepareMethod
  u.prepare_params = RepresentOfficialsUtilities::PrepareParams
  u.prepare_path = RepresentOfficialsUtilities::PreparePath
  u.prepare_query = RepresentOfficialsUtilities::PrepareQuery
  u.graphql_body = RepresentOfficialsUtilities::GraphqlBody
  u.graphql_errors = RepresentOfficialsUtilities::GraphqlErrors
  u.result_basic = RepresentOfficialsUtilities::ResultBasic
  u.result_body = RepresentOfficialsUtilities::ResultBody
  u.result_headers = RepresentOfficialsUtilities::ResultHeaders
  u.transform_request = RepresentOfficialsUtilities::TransformRequest
  u.transform_response = RepresentOfficialsUtilities::TransformResponse
}
