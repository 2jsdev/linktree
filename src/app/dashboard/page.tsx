
import Header from '@/components/dashboard/links/Header'
import AddLinkButton from '@/components/dashboard/links/AddLinkButton'
import LinkList from '@/components/dashboard/links/LinkList'

const Page = () => {
  return (
    <div className="flex-1 p-8">
      <Header />
      <AddLinkButton />
      <LinkList />
    </div>
  )
}

export default Page
