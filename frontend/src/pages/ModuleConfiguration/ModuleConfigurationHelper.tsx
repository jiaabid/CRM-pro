import { useFormik, validateYupSchema } from "formik"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import showNotification from "../../components/extras/showNotification"
import ModuleMiddleware from "../../Redux/Middlewares/ModuleMiddleware"
import * as Yup from 'yup';


export const ModuleConfig = () => {

    /////////////  HOOKS DECLERATION  /////////////


    {/* useSelector Calling  */ }

    const { Module } = useSelector((state: any) => state.module)
    const { MethodType } = useSelector((state: any) => state.module)
    const { RouteId } = useSelector((state: any) => state.module)

    {/* useState  Calling  */ }

    const [value, setvalue] = useState<any>({})
    const [List, setList] = useState<any>([])
    const [fieldTypeId, setfieldTypeId] = useState(6)
    const dispatch = useDispatch<any>()

    /////////////  VARIABLE AND CONSTANT VALUES  /////////////

    const Method = MethodType.variableDetail

    /////////////  RENDERING API DATA  /////////////

    useEffect(() => {
        dispatch(ModuleMiddleware.GetModuele())
        dispatch(ModuleMiddleware.MethodType())
    }, [])


    /////////////  RENDERING API DATA  /////////////

    const { values, handleBlur, handleChange, handleSubmit, errors, touched, isValid, resetForm } = useFormik({
        initialValues: {
            ModuleSelect: '',
            ApiName: '',
            URL: '',
            radioValue: '',
            APIType: '',
            name: '',
            label: '',
            datatype: '',
            required: false,
            nullable: false,
        },
        onSubmit: (values) => {

        },
        validationSchema: Yup.object({
            ModuleSelect: Yup.string().required(),
            ApiName: Yup.string().required(),
            URL: Yup.string().required(),
            radioValue: Yup.string().required(),
            APIType: Yup.string().required(),
            name: Yup.string().required(),
            label: Yup.string().required(),
            datatype: Yup.string().required(),
            required: Yup.string().required(),
            nullable: Yup.string().required(),

        })
    })

    /////////////  FUNCTIONS   /////////////

    const onClickValue = (e: any) => {
        if (value) {
            if (!values.name || !values.label || !values.datatype) {
                return showNotification('Error', 'Fields are Required');
            }
        }
        const tableValues = { name: values.name, label: values.label, datatype: values.datatype, required: values.required, nullable: values.nullable, routeId: RouteId, fieldTypeId, }
        setList([...List, tableValues])
        // console.log(List)

    }
    const apiRequest = () => {
        console.log(List)
        dispatch(ModuleMiddleware.ApiRequest(List))
        setList([])
    }
    const apiResponse = () => {
        dispatch(ModuleMiddleware.ApiResponse(List))
        setList([])
    }
    const APICONFIG = () => {
        if (!values.ApiName || !values.URL || !values.radioValue || !values.APIType || !values.ModuleSelect) {
            showNotification('Error', 'Fields are Required');
            return false
        }
        else {
            dispatch(ModuleMiddleware.ModuleConfiguration(values.ApiName, values.URL, values.radioValue, values.APIType, values.ModuleSelect))
            return true
        }
    }


    /////////////  RETURNING VALUES   /////////////

    return {
        Module,
        value,
        setvalue,
        List,
        setList,
        MethodType,
        onClickValue,
        Method,
        APICONFIG,
        apiRequest,
        apiResponse,
        setfieldTypeId,
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        errors,
        touched,
        isValid,
        resetForm,
    }
}