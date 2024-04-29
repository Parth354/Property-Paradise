'use client';
import BookmarkBtn from "@/components/BookmarkBtn";
import PropertyContactForm from "@/components/PropertyContactForm";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyHeaderImg from "@/components/PropertyHeaderImg";
import PropertyImages from "@/components/PropertyImages";
import ShareBtn from "@/components/ShareBtn";
import Spinner from "@/components/Spinner";
import { fetchProperty } from "@/utilis/Fetch_Property";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft} from "react-icons/fa";

const PropertyPage = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const Property = await fetchProperty(id);
        setProperty(Property)
      } catch (error) {
        console.error('Error Fetching Property', error)

      } finally {
        setLoading(false)
      }
    }
    if (property === null) {
      fetchPropertyData();
    }
  }, [id, property])

  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold m-10"> Property Not Found</h1>
    )
  }

  return <>{loading && <Spinner/>}
    {!loading && property && (
      <>
        <PropertyHeaderImg image={property.images[0]} />
        <section>
          <div className="container m-auto py-6 px-6">
            <Link
              href="/properties"
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              <FaArrowLeft className="fas fa-arrow-left mr-2"></FaArrowLeft> Back to Properties
            </Link>
          </div>
        </section>

        <section className="bg-blue-50">
          <div className="container m-auto py-10 px-6">
            <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
              <PropertyDetails property={property} />

              <aside className="space-y-4">
                <BookmarkBtn property={property}/>
                <ShareBtn property={property}/>

               <PropertyContactForm property={property}/>
              </aside>
            </div>
          </div>
        </section>

        <PropertyImages images = {property.images}/>
      </>
    )}
  </>;
}

export default PropertyPage
