import { useState } from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import api from '@api/HttpClient'
import { apiErrorToast, successToast } from 'services/toastService'
import ConfirmationDialog from '@elements/ConfirmationDialog/ConfirmationDialog'

interface IDeleteEventDialogProps {
  eventId: string
  onClose: () => void
}

const DeleteEventDialog = ({ eventId, onClose }: IDeleteEventDialogProps) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { t } = useTranslation('common')

  const handleDeleted = async () => {
    try {
      setLoading(true)
      await api.delete(`/events/${eventId}`)
      successToast('success')
      router.replace('/home')
    } catch (err) {
      apiErrorToast(err, t)
      onClose()
    }
  }

  return (
    <ConfirmationDialog
      title={t('areYouSure')}
      onCancel={onClose}
      onConfirm={handleDeleted}
      confirmLoading={loading}
      confirmText={t('delete')}
      content={t('byDeletingAnEventAllRelatedContentWillBeDeleted')}
    />
  )
}

export default DeleteEventDialog
