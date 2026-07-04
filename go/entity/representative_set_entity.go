package entity

import (
	"github.com/voxgig-sdk/represent-officials-sdk/go/core"

	vs "github.com/voxgig-sdk/represent-officials-sdk/go/utility/struct"
)

type RepresentativeSetEntity struct {
	name    string
	client  *core.RepresentOfficialsSDK
	utility *core.Utility
	entopts map[string]any
	data    map[string]any
	match   map[string]any
	entctx  *core.Context
}

func NewRepresentativeSetEntity(client *core.RepresentOfficialsSDK, entopts map[string]any) *RepresentativeSetEntity {
	if entopts == nil {
		entopts = map[string]any{}
	}
	if _, ok := entopts["active"]; !ok {
		entopts["active"] = true
	} else if entopts["active"] == false {
		// keep false
	} else {
		entopts["active"] = true
	}

	e := &RepresentativeSetEntity{
		name:    "representative_set",
		client:  client,
		utility: client.GetUtility(),
		entopts: entopts,
		data:    map[string]any{},
		match:   map[string]any{},
	}

	e.entctx = e.utility.MakeContext(map[string]any{
		"entity":  e,
		"entopts": entopts,
	}, client.GetRootCtx())

	e.utility.FeatureHook(e.entctx, "PostConstructEntity")

	return e
}

func (e *RepresentativeSetEntity) GetName() string { return e.name }

func (e *RepresentativeSetEntity) Make() core.Entity {
	opts := map[string]any{}
	for k, v := range e.entopts {
		opts[k] = v
	}
	return NewRepresentativeSetEntity(e.client, opts)
}

func (e *RepresentativeSetEntity) Data(args ...any) any {
	if len(args) > 0 && args[0] != nil {
		e.data = core.ToMapAny(vs.Clone(args[0]))
		if e.data == nil {
			e.data = map[string]any{}
		}
		e.utility.FeatureHook(e.entctx, "SetData")
	}

	e.utility.FeatureHook(e.entctx, "GetData")
	out := vs.Clone(e.data)
	return out
}

func (e *RepresentativeSetEntity) Match(args ...any) any {
	if len(args) > 0 && args[0] != nil {
		e.match = core.ToMapAny(vs.Clone(args[0]))
		if e.match == nil {
			e.match = map[string]any{}
		}
		e.utility.FeatureHook(e.entctx, "SetMatch")
	}

	e.utility.FeatureHook(e.entctx, "GetMatch")
	out := vs.Clone(e.match)
	return out
}

// DataTyped is the statically-typed accessor for this entity's data. With no
// argument it returns the current data as an RepresentativeSet; with an argument it
// sets the data and returns the stored value. It delegates to the untyped Data
// (identical runtime) and converts at the typed boundary.
func (e *RepresentativeSetEntity) DataTyped(data ...RepresentativeSet) RepresentativeSet {
	if len(data) > 0 {
		return typedFrom[RepresentativeSet](e.Data(asMap(data[0])))
	}
	return typedFrom[RepresentativeSet](e.Data())
}

// MatchTyped mirrors DataTyped for the entity's match filter. The match is a
// partial of the entity, so it round-trips through RepresentativeSet (all fields
// optional at the wire level).
func (e *RepresentativeSetEntity) MatchTyped(match ...RepresentativeSet) RepresentativeSet {
	if len(match) > 0 {
		return typedFrom[RepresentativeSet](e.Match(asMap(match[0])))
	}
	return typedFrom[RepresentativeSet](e.Match())
}


func (e *RepresentativeSetEntity) Load(reqmatch map[string]any, ctrl map[string]any) (any, error) {
	utility := e.utility
	ctx := utility.MakeContext(map[string]any{
		"opname":   "load",
		"ctrl":     ctrl,
		"match":    e.match,
		"data":     e.data,
		"reqmatch": reqmatch,
	}, e.entctx)

	return e.runOp(ctx, func() {
		if ctx.Result != nil {
			if ctx.Result.Resmatch != nil {
				e.match = ctx.Result.Resmatch
			}
			if ctx.Result.Resdata != nil {
				e.data = core.ToMapAny(vs.Clone(ctx.Result.Resdata))
				if e.data == nil {
					e.data = map[string]any{}
				}
			}
		}
	})
}

// LoadTyped is the statically-typed variant of Load: it takes an
// RepresentativeSetLoadMatch and returns an RepresentativeSet. It delegates to the untyped
// Load (identical runtime) and converts at the typed boundary.
func (e *RepresentativeSetEntity) LoadTyped(reqmatch RepresentativeSetLoadMatch, ctrl map[string]any) (RepresentativeSet, error) {
	res, err := e.Load(asMap(reqmatch), ctrl)
	if err != nil {
		return RepresentativeSet{}, err
	}
	return typedFrom[RepresentativeSet](res), nil
}




func (e *RepresentativeSetEntity) List(reqmatch map[string]any, ctrl map[string]any) (any, error) {
	utility := e.utility
	ctx := utility.MakeContext(map[string]any{
		"opname":   "list",
		"ctrl":     ctrl,
		"match":    e.match,
		"data":     e.data,
		"reqmatch": reqmatch,
	}, e.entctx)

	return e.runOp(ctx, func() {
		if ctx.Result != nil {
			if ctx.Result.Resmatch != nil {
				e.match = ctx.Result.Resmatch
			}
		}
	})
}

// ListTyped is the statically-typed variant of List: it takes an
// RepresentativeSetListMatch and returns []RepresentativeSet. It delegates to the untyped
// List (identical runtime) and converts at the typed boundary.
func (e *RepresentativeSetEntity) ListTyped(reqmatch RepresentativeSetListMatch, ctrl map[string]any) ([]RepresentativeSet, error) {
	res, err := e.List(asMap(reqmatch), ctrl)
	if err != nil {
		return nil, err
	}
	return typedSliceFrom[RepresentativeSet](res), nil
}



func (e *RepresentativeSetEntity) Create(_ map[string]any, _ map[string]any) (any, error) {
	return core.UnsupportedOp("create", e.name)
}


func (e *RepresentativeSetEntity) Update(_ map[string]any, _ map[string]any) (any, error) {
	return core.UnsupportedOp("update", e.name)
}


func (e *RepresentativeSetEntity) Remove(_ map[string]any, _ map[string]any) (any, error) {
	return core.UnsupportedOp("remove", e.name)
}


func (e *RepresentativeSetEntity) runOp(ctx *core.Context, postDone func()) (any, error) {
	utility := e.utility

	utility.FeatureHook(ctx, "PrePoint")
	point, err := utility.MakePoint(ctx)
	ctx.Out["point"] = point
	if err != nil {
		return utility.MakeError(ctx, err)
	}

	utility.FeatureHook(ctx, "PreSpec")
	spec, err := utility.MakeSpec(ctx)
	ctx.Out["spec"] = spec
	if err != nil {
		return utility.MakeError(ctx, err)
	}

	utility.FeatureHook(ctx, "PreRequest")
	resp, err := utility.MakeRequest(ctx)
	ctx.Out["request"] = resp
	if err != nil {
		return utility.MakeError(ctx, err)
	}

	utility.FeatureHook(ctx, "PreResponse")
	resp2, err := utility.MakeResponse(ctx)
	ctx.Out["response"] = resp2
	if err != nil {
		return utility.MakeError(ctx, err)
	}

	utility.FeatureHook(ctx, "PreResult")
	result, err := utility.MakeResult(ctx)
	ctx.Out["result"] = result
	if err != nil {
		return utility.MakeError(ctx, err)
	}

	utility.FeatureHook(ctx, "PreDone")
	postDone()

	return utility.Done(ctx)
}
