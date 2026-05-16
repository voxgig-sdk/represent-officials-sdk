package core

type RepresentOfficialsError struct {
	IsRepresentOfficialsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewRepresentOfficialsError(code string, msg string, ctx *Context) *RepresentOfficialsError {
	return &RepresentOfficialsError{
		IsRepresentOfficialsError: true,
		Sdk:              "RepresentOfficials",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *RepresentOfficialsError) Error() string {
	return e.Msg
}
