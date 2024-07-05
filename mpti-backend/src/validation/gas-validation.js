import Joi from 'joi';
import JoiDate from '@joi/date';

const joi_format = Joi.extend(JoiDate)

const addGasValidation = Joi.object({
    inputDate: joi_format.date().format('YYYY-MM-DDTHH:mm').required().messages({
        "any.required":"Tanggal input tidak boleh kosong",
        "date.format": "Format input tanggal tidak sesuai"
    }),
    countStok: Joi.number().positive().required().messages({
        "number.positive": "Format stok tidak menerima nilai negative atau kosong",
        "any.required":"Tanggal input tidak boleh kosong",
    }),
    information: Joi.string().allow(null, '').max(100).optional(),
})

const updatePriceGasValidation = Joi.object({
    inputDate: joi_format.date().format('YYYY-MM-DDTHH:mm').required().messages({
        "any.required":"Tanggal input tidak boleh kosong",
        "date.format": "Format input tanggal tidak sesuai"
    }),
    priceBuy: Joi.number().positive().required().messages({
        "number.positive": "Format harga beli tidak menerima nilai negative atau kosong",
        "any.required":"Tanggal input tidak boleh kosong",
    }),
    priceSell: Joi.number().positive().required().messages({
        "number.positive": "Format harga jual tidak menerima nilai negative atau kosong",
        "any.required":"Input  tidak boleh kosong",
    }),
})

const searchGasStokHistoryValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1).messages({
        "number.positive": "Format page tidak menerima nilai negative atau kosong",
    }),
    size: Joi.number().min(1).positive().max(100).default(10).messages({
        "number.positive": "Format size tidak menerima nilai negative atau kosong",
    }),
    startDate: joi_format.date().format('YYYY-MM-DDTHH:mm').optional().messages({
        "date.format": "Format startDate tidak sesuai"
    }),
    endDate: joi_format.date().format('YYYY-MM-DDTHH:mm').optional().messages({
        "date.format": "Format endDate tidak sesuai"
    }),
})

const searchGasSalesHistoryValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1).messages({
        "number.positive": "Format page tidak menerima nilai negative atau kosong",
    }),
    size: Joi.number().min(1).positive().max(100).default(10).messages({
        "number.positive": "Format size tidak menerima nilai negative atau kosong",
    }),
    startDate: joi_format.date().format('YYYY-MM-DDTHH:mm').optional().messages({
        "date.format": "Format startDate tidak sesuai"
    }),
    endDate: joi_format.date().format('YYYY-MM-DDTHH:mm').optional().messages({
        "date.format": "Format endDate tidak sesuai"
    }),
})

const downloadGasStokHistoryValidation = Joi.object({
    startDate: joi_format.date().format('YYYY-MM-DDTHH:mm').optional().messages({
        "date.format": "Format startDate tidak sesuai"
    }),
    endDate: joi_format.date().format('YYYY-MM-DDTHH:mm').optional().messages({
        "date.format": "Format endDate tidak sesuai"
    }),
})

const downloadGasSalesHistoryValidation = Joi.object({
    startDate: joi_format.date().format('YYYY-MM-DDTHH:mm').optional().messages({
        "date.format": "Format startDate tidak sesuai"
    }),
    endDate: joi_format.date().format('YYYY-MM-DDTHH:mm').optional().messages({
        "date.format": "Format endDate tidak sesuai"
    }),
})

const deleteGasStokValidation = Joi.number().positive().required()

const returGasStokValidation = Joi.object({
    nik:Joi.string().max(16).min(16).pattern(new RegExp("^[0-9]")).required().messages({
        "string.min": "NIK minimal 16 karakter",
        "string.max": "NIK maksimal 16 karakter",
        "string.pattern.base": "Format NIK wajib berisi angka",
        "any.required": "NIK wajib diisi"
    }),
    countReturNew: Joi.number().positive().default(0).messages({
        "number.positive": "Format retur tabung baru tidak menerima nilai negative atau kosong",
    }),
    countReturMoney: Joi.number().positive().default(0).messages({
        "number.positive": "Format retur uang tidak menerima nilai negative atau kosong",
    }),
})

const newTransactionGasValidation = Joi.object({
    nik: Joi.string().max(16).min(16).pattern(new RegExp("^[0-9]")).messages({
        "string.min": "NIK minimal 16 karakter",
        "string.max": "NIK maksimal 16 karakter",
        "string.pattern.base": "Format NIK wajib berisi angka",
        "any.required": "NIK wajib diisi"
    }),
    inputDate: joi_format.date().format('YYYY-MM-DDTHH:mm').required().messages({
        "number.positive": "Format retur tabung baru tidak menerima nilai negative atau kosong",
    }),
    countBuy: Joi.number().positive().min(1).max(3).required().messages({
        "number.positive": "Format retur uang tidak menerima nilai negative atau kosong",
        "number.min": "Pembelian minimal 1",
        "number.max": "Pembelian maksimal 3",
    }),
})

export {
    addGasValidation,
    searchGasStokHistoryValidation,
    searchGasSalesHistoryValidation,
    downloadGasStokHistoryValidation,
    downloadGasSalesHistoryValidation,
    updatePriceGasValidation,
    deleteGasStokValidation,
    returGasStokValidation,
    newTransactionGasValidation
}
