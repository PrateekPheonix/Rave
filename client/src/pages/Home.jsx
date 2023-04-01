import React, { useState, useEffect } from 'react'
import axios, { all } from 'axios'

import Loader from '../components/Loader'
import Card from '../components/Card'
import FormField from '../components/FormField'

const RenderCards = ({ data, title }) => {

    console.log(data)

    if (data?.length > 0) {
        return data.map((post) => {
            return <Card key={post._id} {...post} />
        })
    }
    return (
        <h2 className='mt-5 font-bold text-[#6449ff] text-l uppercase '>
            {title}
        </h2>
    )
}


const Home = () => {

    const [loading, setLoading] = useState(false)
    const [allPosts, setAllPosts] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [searchTimeout, setSearchTimeout] = useState(null)

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true)
            try {
                const response = await axios.get('https://raveai.onrender.com/api/post', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                console.log(response)
                if (response.status === 200) {
                    console.log("sajn")
                    setAllPosts(response.data.data.reverse())
                }
            } catch (error) {
                alert(error)
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [])

    console.log(allPosts)

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout)

        setSearchText(e.target.value)

        setSearchTimeout(
            setTimeout(() => {
                const searchResult = allPosts.filter((item) => {
                    return item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase())
                })
                console.log(searchText)
                console.log(searchResult)
                setSearchResults(searchResult)
            }, 500)
        )
    }

    return (
        <section className='max-w-7xl mx-auto'>
            <div>
                <h1 className='font-extrabold text-[#222328] text-[32px]'>
                    The Comunity Showcase
                </h1>
                <p className='mt-2 text-[#666e75] text-[16px] max-w-[700px] '>
                    Browse through a collection of imaginative and visually stunning images generated by AI
                </p>
            </div>

            <div className='mt-16'>
                <FormField
                    LabelName="Search Post"
                    type="text"
                    name="text"
                    placeholder="Search Posts..."
                    value={searchText}
                    handleChange={handleSearchChange}
                />
            </div>

            <div className='mt-10'>
                {
                    loading ? (
                        <div className='flex justify-center items-center'>
                            <Loader />
                        </div>
                    ) : (
                        <>
                            {searchText && (
                                <h2 className='font-medium text-[#666e75] text-xl mb-3 '>
                                    Showing Results for <span className='text-[#222328] '>{searchText}</span>
                                </h2>
                            )}
                            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                                {searchText ? (
                                    <RenderCards data={searchResults} title="No Search results found!!" />
                                ) : (
                                    <>
                                        <RenderCards data={allPosts} title="No Post Found" />
                                    </>
                                )}
                            </div>
                        </>
                    )
                }
            </div>
        </section>
    )
}

export default Home