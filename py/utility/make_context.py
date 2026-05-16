# RepresentOfficials SDK utility: make_context

from core.context import RepresentOfficialsContext


def make_context_util(ctxmap, basectx):
    return RepresentOfficialsContext(ctxmap, basectx)
