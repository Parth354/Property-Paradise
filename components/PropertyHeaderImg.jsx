import { FaArrowLeft } from "react-icons/fa"

const PropertyHeaderImg = (image) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <img
            src={image.image}
            alt="Not Found"
            className="object-cover h-[400px] w-full"
            width={0}
            height={0}
            sizes="100vw"
            priority="true"
          />
        </div>
      </div>
    </section>
  )
}

export default PropertyHeaderImg
