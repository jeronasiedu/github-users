import { useState } from 'react'
import {
  BiSearchAlt2,
  BsLink45Deg,
  AiOutlineTwitter,
  MdEmail,
  BsFolder2Open,
  BsStar,
} from 'react-icons/all'
import { Audio } from 'react-loader-spinner'
import millify from 'millify'
const App = () => {
  const url = 'https://api.github.com/users'
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const [repos, setRepos] = useState([])
  const [searchedBefore, setSearchedBefore] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch(`${url}/${username}`)
      const results = await response.json()
      setData(results)
      const reposResponse = await fetch(`${url}/${username}/repos`)
      const resposResults = await reposResponse.json()
      setRepos(resposResults)
      console.log(repos)
      console.log(data)
      setUsername('')
      setLoading(false)
      setSearchedBefore(true)
    } catch (error) {
      console.log(error.response)
      setLoading(false)
    }
  }
  return (
    <main className="bg-primary min-h-screen p-3 flex flex-col items-center gap-2 ">
      <h1 className="text-white xs:text-xl uppercase text-center tracking-wide text-base">
        Find all your {''}
        <span className="text-red-300 font-semibold">favorite</span> developers
      </h1>
      <form
        className="w-full flex  justify-center xs:max-w-xl  relative"
        onSubmit={handleSubmit}
      >
        <input
          type="search"
          className="placeholder:text-sm w-full rounded-lg bg-secondary p-2 pl-9 outline-none text-white"
          placeholder="Search for developers "
          spellCheck="false"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
          }}
        />
        <BiSearchAlt2
          className="text-gray-300
        absolute left-2 top-1/2 -translate-y-1/2"
          size={23}
        />
      </form>
      {/* GITHUB USER  */}
      {searchedBefore && !data.login ? (
        <div className="mt-3">
          <h2 className="text-xl text-red-500 bg-red-300 p-2 rounded animate-pulse">
            Not found
          </h2>
        </div>
      ) : loading ? (
        <div>
          <Audio height="100" width="100" color="#5b616f" ariaLabel="loading" />
        </div>
      ) : (
        data.login && (
          <section className="w-full xs:max-w-2xl space-y-2">
            <h3 className="text-white text-base ">Developer Matched </h3>
            <div className="bg-other p-3 rounded-sm">
              <div className="flex justify-between items-start">
                <div className="">
                  <div className="overflow-hidden w-24 aspect-square rounded-full">
                    <img
                      src={data.avatar_url}
                      alt="user image"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-white font text-lg tracking-wide">
                    {data.name}
                  </p>
                </div>

                <a
                  href={data.html_url}
                  className="px-2 py-0.5 bg-primary text-white rounded-lg text-lg tracking-wide"
                  target="_blank"
                >
                  Follow
                </a>
              </div>
              {data.bio && (
                <p aria-label="bio" className="text-gray-400 font-sans ">
                  {data.bio}
                </p>
              )}

              <div className="flex mt-2 gap-3">
                <p className="text-gray-300 text-sm xs:text-base">
                  <span className="text-white">
                    {data.followers && millify(data.followers)}
                  </span>{' '}
                  Followers
                </p>
                <p className="text-gray-300 text-sm xs:text-base">
                  <span className="text-white">{data.following}</span> Following
                </p>
                <p className="text-gray-300 text-sm xs:text-base">
                  <span className="text-white">{data.public_repos}</span> Public
                  Repos
                </p>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.blog && (
                  <a
                    className="bg-primary text-gray-400 rounded-md p-1 flex items-center"
                    href={data.blog}
                    target="_blank"
                  >
                    <span>
                      <BsLink45Deg size={20} />
                    </span>
                    {data.blog.replace(/^https?:\/\//, '')}
                  </a>
                )}
                {data.twitter_username && (
                  <a
                    className="bg-primary text-gray-400 rounded-md p-1 flex items-center"
                    href={`https://twitter.com/${data.twitter_username}`}
                    target="_blank"
                  >
                    <span>
                      <AiOutlineTwitter size={20} />
                    </span>
                    {data.twitter_username}
                  </a>
                )}
                {data.email && (
                  <a
                    className="bg-primary text-gray-400 rounded-md p-1 flex items-center"
                    href="mailto:norejudeisa@gmail.com"
                    target="_blank"
                  >
                    <span>
                      <MdEmail size={20} />
                    </span>
                    {data.email}
                  </a>
                )}
              </div>
            </div>
            <div className="text-base">
              <div className="flex justify-between text-white mb-2 ">
                <h3>Public Repos</h3>
                <a
                  href={data.html_url}
                  className="uppercase text-gray-400"
                  target="_blank"
                >
                  see all
                </a>
              </div>
              <div className=" flex gap-1  overflow-x-auto w-full xs:flex-wrap snap-mandatory snap-x slider ">
                {repos.slice(0, 10).map((item) => (
                  <div className="p-3 bg-secondary rounded w-3/5 flex-shrink-0 xs:flex-shrink special-width snap-center transition duration-500 snap-always hover:shadow-xl ">
                    <div className=" flex justify-between items-center ">
                      <BsFolder2Open className="text-white" size={20} />
                      <span className="text-white flex gap-1 items-center">
                        {item.stargazers_count &&
                          millify(item.stargazers_count)}
                        <BsStar />
                      </span>
                    </div>
                    <p className="text-gray-300">{item.name}</p>
                    <p className="text-gray-400 text-sm">
                      {item.description
                        ? item.description
                        : 'No description for this project'}
                    </p>
                    <p className="text-right text-red-300 text-sm">
                      {' '}
                      {item.language}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      )}
    </main>
  )
}
export default App
