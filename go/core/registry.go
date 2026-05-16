package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBoundaryEntityFunc func(client *RepresentOfficialsSDK, entopts map[string]any) RepresentOfficialsEntity

var NewBoundarySetEntityFunc func(client *RepresentOfficialsSDK, entopts map[string]any) RepresentOfficialsEntity

var NewCandidateEntityFunc func(client *RepresentOfficialsSDK, entopts map[string]any) RepresentOfficialsEntity

var NewElectionEntityFunc func(client *RepresentOfficialsSDK, entopts map[string]any) RepresentOfficialsEntity

var NewPostalCodeEntityFunc func(client *RepresentOfficialsSDK, entopts map[string]any) RepresentOfficialsEntity

var NewRepresentatifEntityFunc func(client *RepresentOfficialsSDK, entopts map[string]any) RepresentOfficialsEntity

var NewRepresentativeSetEntityFunc func(client *RepresentOfficialsSDK, entopts map[string]any) RepresentOfficialsEntity

