'use client';
import { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard"
import Spinner from "./Spinner";
import Pagination from "./Pagination";

const Properties = () => {
    const [properties, setProperties]= useState([])
    const [loading, setLoading]= useState(true)
    const [page, setPage]= useState(1);
    const [pageSize, setPageSize]= useState(6);
    const [totalItems, setTotalItems]= useState(0);

    useEffect(()=>{
        const fetchProperties = async ()=>{
            try {
                const res = await fetch(`/api/properties?page=${page}&pageSize=${pageSize}`)
                if(!res.ok){
                    throw new Error('Failed To Fetch Data')
                }
                const data = await res.json();
                setTotalItems(data.totalProperties)
                setProperties(data.properties);
                
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false)
            }
        }

        fetchProperties();
    },[page,pageSize])

    const handlePageChange = (newPage)=>{
        setPage(newPage);
    }

  return loading ? (<Spinner loading={loading}/> ):(
    <section className="px-4 py-6">
    <div className="container-xl lg:container m-auto px-4 py-6">
      {properties.length === 0 ? (
        <p>No Properties Found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}
      <Pagination page={page} pageSize={pageSize} totalItems={totalItems} onPageChange={handlePageChange}/>
    </div>
  </section>
  )
}

export default Properties
