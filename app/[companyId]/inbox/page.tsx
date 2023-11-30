import EmptyState from '@/components/EmptyState'

interface InboxPageProps {
  params: {
    company: string
  }
}

const InboxPage = ({}: InboxPageProps) => {
  return (
    <div className="hidden md:block w-full h-full">
      <EmptyState />
    </div>
  )
}

export default InboxPage
