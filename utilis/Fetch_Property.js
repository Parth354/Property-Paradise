const Api_Domain=process.env.NEXT_PUBLIC_API_DOMAIN || null
export default async function fetchProperties({showFeatured = false} = {}) {
    try {
        if(!Api_Domain) {
            return [];
        }
        const res = await fetch(`${Api_Domain}/properties${showFeatured ? '/featured' : ''}`,{ cache: 'no-store' });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return[];
    }
}

async function fetchProperty(id) {
    try {
        if(!Api_Domain) {
            return null
        }
        const res = await fetch(`${Api_Domain}/properties/${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return;
    }
}

export {fetchProperty}