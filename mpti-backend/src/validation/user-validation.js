import Joi from "joi"


const loginUserValidation = Joi.object({
    username: Joi.string().max(100).required().messages({
        "string": "Username tidak boleh kosong",
        "string.max": "Maksimal username 100 karakter",
        "any.required": "Username tidak boleh kosong"
    }),
    password: Joi.string().max(100).required().messages({
        "string": "Password tidak boleh kosong",
        "string.max": "Maksimal password 100 karakter",
        "any.required": "Password tidak boleh kosong"
    }),
})

const emailUserValidation = Joi.object({
    email: Joi.string().max(100).pattern(new RegExp("^[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9]+)*@gmail\.com$")).required().messages({
        "string": "Email tidak boleh kosong",
        "string.max": "Maksimal username 100 karakter",
        "any.required": "Username tidak boleh kosong",
        "string.pattern.base": "Bukan akun gmail"
    }),
})

const codeOtpUserValidation = Joi.object({
    code: Joi.string().min(6).max(6).required().messages({
        "string": "Wajib diisi",
        "string.max": "Maksimal 6 karakter",
        "string.min": "Minimal 6 karakter",
        "any.required": "Wajib terisi",
    }),
    email: Joi.string().max(100).pattern(new RegExp("^[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9]+)*@gmail\.com$")).required().messages({
        "string": "Email tidak boleh kosong",
        "string.max": "Maksimal username 100 karakter",
        "any.required": "Username tidak boleh kosong",
        "string.pattern.base": "Bukan akun gmail"
    }),
})

const repassUserValidation = Joi.object({
    code: Joi.string().min(6).max(6).required().messages({
        "string": "Wajib diisi",
        "string.max": "Maksimal 6 karakter",
        "string.min": "Minimal 6 karakter",
        "any.required": "Wajib terisi",
    }),
    email: Joi.string().max(100).pattern(new RegExp("^[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9]+)*@gmail\.com$")).required().messages({
        "string": "Email tidak boleh kosong",
        "string.max": "Maksimal username 100 karakter",
        "any.required": "Username tidak boleh kosong",
        "string.pattern.base": "Bukan akun gmail"
    }),
    newPass: Joi.string().min(6).max(100).required().messages({
        "string": "Password tidak boleh kosong",
        "string.min": "Minimal kata sandi 6 karakter",
        "string.max": "Maksimal kata sandi 100 karakter",
        "any.required": "Password tidak boleh kosong",
    }),
    reNewPass: Joi.string().min(6).max(100).required().messages({
        "string": "Password konfirmasi tidak boleh kosong",
        "string.min": "Minimal kata sandi 6 karakter",
        "string.max": "Maksimal kata sandi 100 karakter",
        "any.required": "Password konfirmasi tidak boleh kosong",
    }),
})

const logoutUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    token: Joi.string().max(100).required(),
})

export {
    loginUserValidation,
    emailUserValidation,
    codeOtpUserValidation,
    repassUserValidation,
    logoutUserValidation
}