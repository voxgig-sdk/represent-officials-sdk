package voxgigrepresentofficialssdk

import (
	"github.com/voxgig-sdk/represent-officials-sdk/go/core"
	"github.com/voxgig-sdk/represent-officials-sdk/go/entity"
	"github.com/voxgig-sdk/represent-officials-sdk/go/feature"
	_ "github.com/voxgig-sdk/represent-officials-sdk/go/utility"
)

// Type aliases preserve external API.
type RepresentOfficialsSDK = core.RepresentOfficialsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type RepresentOfficialsEntity = core.RepresentOfficialsEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type RepresentOfficialsError = core.RepresentOfficialsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBoundaryEntityFunc = func(client *core.RepresentOfficialsSDK, entopts map[string]any) core.RepresentOfficialsEntity {
		return entity.NewBoundaryEntity(client, entopts)
	}
	core.NewBoundarySetEntityFunc = func(client *core.RepresentOfficialsSDK, entopts map[string]any) core.RepresentOfficialsEntity {
		return entity.NewBoundarySetEntity(client, entopts)
	}
	core.NewCandidateEntityFunc = func(client *core.RepresentOfficialsSDK, entopts map[string]any) core.RepresentOfficialsEntity {
		return entity.NewCandidateEntity(client, entopts)
	}
	core.NewElectionEntityFunc = func(client *core.RepresentOfficialsSDK, entopts map[string]any) core.RepresentOfficialsEntity {
		return entity.NewElectionEntity(client, entopts)
	}
	core.NewPostalCodeEntityFunc = func(client *core.RepresentOfficialsSDK, entopts map[string]any) core.RepresentOfficialsEntity {
		return entity.NewPostalCodeEntity(client, entopts)
	}
	core.NewRepresentatifEntityFunc = func(client *core.RepresentOfficialsSDK, entopts map[string]any) core.RepresentOfficialsEntity {
		return entity.NewRepresentatifEntity(client, entopts)
	}
	core.NewRepresentativeSetEntityFunc = func(client *core.RepresentOfficialsSDK, entopts map[string]any) core.RepresentOfficialsEntity {
		return entity.NewRepresentativeSetEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewRepresentOfficialsSDK = core.NewRepresentOfficialsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewRepresentOfficialsSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *RepresentOfficialsSDK  { return NewRepresentOfficialsSDK(nil) }
func Test() *RepresentOfficialsSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
