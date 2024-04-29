import React from 'react'
import InfoBox from './InfoBox'

const Info_Boxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
          heading='For Renters'
          buttonInfo={{
            text:'Browse Properties',
            backgroundColor:'bg-black',
            link:'/properties'

          }}>Find your dream rental Property. Find rentals in your nearby locality and area by directly contacting the owners</InfoBox>
           <InfoBox
          heading='Property Owners'
          backgroundColor='bg-blue-100'
          buttonInfo={{
            text:'Add Property',
            backgroundColor:'bg-blue-700',
            link:'/properties/add'

          }}>List your Property and reach possible tenants. Rent as an Airbnb or long term rentals.</InfoBox>
        </div>
      </div>
    </section>
  )
}

export default Info_Boxes
