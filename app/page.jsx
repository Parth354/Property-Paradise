import FeaturedProperties from '@/components/FeaturedProperties'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import HomeProperties from '@/components/HomeProperties'
import Info_Boxes from "@/components/Info_Boxes"

export const dynamic = 'force-dynamic'

const HomePage = () => {

    return (
    <>
        <Hero/>
        <Info_Boxes/>
        <FeaturedProperties/>
        <HomeProperties/>
        <Footer/>
        
    </>
    )
}

export default HomePage