'use client'

import { ShieldAlert, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import qs from 'query-string'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useModal } from '@/hooks/use-modal-store'
import { CompanyWithMembersWithProfiles } from '@/types'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import toast from 'react-hot-toast'

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 text-rose-500" />,
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email('E-mail Inválido!').toLowerCase(),
})

export const CreateProfileModal = () => {
  const router = useRouter()
  const params = useParams()
  const { onOpen, isOpen, onClose, type, data } = useModal()

  const isModalOpen = isOpen && type === 'members'
  const { company } = data as { company: CompanyWithMembersWithProfiles }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: '/api/profiles',
        query: {
          companyId: params?.companyId,
        },
      })

      await axios.post(url, values)

      form.reset()
      router.refresh()
      onClose()
    } catch ({ response }: any) {
      const errorMessage = response?.data?.error
      toast.error(errorMessage)
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-ls pb-6 text-start font-semibold">
            Criar novo perfil
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-row gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Digite o nome do perfil"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Digite o e-mail do perfil"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading} type="submit">
              Criar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
