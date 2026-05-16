-- RepresentOfficials SDK error

local RepresentOfficialsError = {}
RepresentOfficialsError.__index = RepresentOfficialsError


function RepresentOfficialsError.new(code, msg, ctx)
  local self = setmetatable({}, RepresentOfficialsError)
  self.is_sdk_error = true
  self.sdk = "RepresentOfficials"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function RepresentOfficialsError:error()
  return self.msg
end


function RepresentOfficialsError:__tostring()
  return self.msg
end


return RepresentOfficialsError
