import { getServerMe } from "@/lib/api/serverApi"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

import css from "./ProfilePage.module.css"

export const metadata: Metadata = {
  title: "Profile",
  description: "View your profile information on NoteHub",
  openGraph: {
    title: "Profile",
    description: "Your user profile page",
    url: "/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Image",
      }
    ]
  }
}

const Profile = async () => {
  const user = await getServerMe()
  return (
    <main className={css.mainContent}>
  <div className={css.profileCard}>
      <div className={css.header}>
	     <h1 className={css.formTitle}>Profile Page</h1>
	     <Link href="/profile/edit" className={css.editProfileButton}>
	       Edit Profile
	     </Link>
	   </div>
     <div className={css.avatarWrapper}>
      <Image
        src={user.avatar}
        alt="User Avatar"
        width={120}
        height={120}
        className={css.avatar}
      />
    </div>
    <div className={css.profileInfo}>
      <p>
        Username: {user.username}
      </p>
      <p>
        Email: {user.email}
      </p>
    </div>
  </div>
</main>
  )
}

export default Profile