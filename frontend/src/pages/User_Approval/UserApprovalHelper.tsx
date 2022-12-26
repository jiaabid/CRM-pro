import { useFormik } from 'formik';
import react, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { PER_COUNT } from '../../components/PaginationButtons';
import { useAppDispatch } from '../../Configurations/Hooks/Hooks';
import UserApprovalMiddleware from '../../Redux/Middlewares/UserApprovalMiddleware';

export const userApproval = () => {

    //////////   HOOKS DECLERATION/CALLED      //////////

    const { Approvals } = useSelector((state: any) => state.userapprovals)
    const { Rejections } = useSelector((state: any) => state.userapprovals)
    const { Pendings } = useSelector((state: any) => state.userapprovals)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(PER_COUNT['10']);
    const [editModalStatus, setEditModalStatus] = useState<boolean>(false);
    const [rejectID, setrejectID] = useState(null)
    const [approveId, setapproveId] = useState(null)
    const dispatch = useDispatch<any>()


    //////////   ONCLICK FUNTIONS USED IN BUTTON   //////////

    const onApprove = (id: any) => {
        console.log(id)
        dispatch(UserApprovalMiddleware.ApproveRequest(id))
        setapproveId(id)
    }

    const onRejectClick = (rejectId: any) => {
        setrejectID(rejectId)
        setEditModalStatus(true)
    }


    //////////   RETURNING VALUES      //////////

    return {
        Approvals,
        Rejections,
        Pendings,
        currentPage,
        setCurrentPage,
        perPage,
        setPerPage,
        editModalStatus,
        setEditModalStatus,
        onRejectClick,
        rejectID,
        onApprove
    }

}