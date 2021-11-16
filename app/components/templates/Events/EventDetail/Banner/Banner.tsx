import { ChangeEvent, useRef, useState } from 'react'
import { Publish } from '@material-ui/icons'
import { useQueryClient } from 'react-query'
import { Box, CircularProgress } from '@material-ui/core'
import useTranslation from 'next-translate/useTranslation'
import compress from 'browser-image-compression'

import api from '@api/HttpClient'
import { IEventDetail } from '../EventDetailTemplate'
import { apiErrorToast, errorToast, successToast } from 'services/toastService'
import { Image, ImageWrapper, Overlay, Wrapper } from './Banner.styled'

interface IBannerProps {
  src: string
  eventId: string
  canUpload: boolean
}

const Banner = ({ src, canUpload, eventId }: IBannerProps) => {
  const inputRef = useRef<HTMLInputElement>(null!)
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  const { t } = useTranslation('common')

  const handleInputChanged = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return errorToast(t('validator.unsupportedMediaType'))

    setLoading(true)
    const compressed = file.size < 500_000 ? file : await compress(file, { maxSizeMB: 0.4 })
    const formData = new FormData()
    formData.append('banner', compressed as Blob)

    try {
      const { data } = await api.post(`/events/${eventId}/banner`, formData)
      queryClient.setQueryData<IEventDetail>(['events', eventId], prev => ({
        ...prev,
        ...data
      }))
      successToast(t('saved'))
    } catch (error) {
      apiErrorToast(error, t)
    }
    setLoading(false)
  }

  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={src} />

        {canUpload && (
          <Overlay opacity={loading ? 1 : 0} onClick={() => inputRef.current.click()}>
            {loading ? <CircularProgress /> : <Publish />}
          </Overlay>
        )}
      </ImageWrapper>

      <Box display='none'>
        <input
          value=''
          type='file'
          accept='image/*'
          ref={inputRef}
          disabled={loading}
          onChange={handleInputChanged}
        />
      </Box>
    </Wrapper>
  )
}

export default Banner
