
export default function UserProfile({params}: any) {
        return(
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="text-7xl mb-5">
                    Profile
                </h1>
                <hr />
                <p className="text-4xl">Profile Page
                    <span className="p-2 ml-2 rounded bg-red-400">{params.id}</span>
                </p>
            </div>
   )
}