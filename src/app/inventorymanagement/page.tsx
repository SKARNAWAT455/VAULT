export default function InventoryManagement() {
    return (
        <>
            <div className="container-fluid page-header py-5 mb-5">
                <div className="container py-5">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">Inventory Management</h1>
                    <nav aria-label="breadcrumb animated slideInDown"></nav>
                </div>
            </div>

            <h5>
                <p style={{
                    color: '#000000',
                    fontFamily: "'Merriweather', serif",
                    fontSize: '20px',
                    fontWeight: 300,
                    lineHeight: '40px',
                    margin: '0 30px 40px',
                    textAlign: 'center',
                    textShadow: '#000000 -1px -1px'
                }}>
                    Effectively managing antiques within an inventory system involves a nuanced approach to preservation, categorization, valuation, and documentation. Our inventory management system for antiques is designed to cater to the unique demands of this specialized field.
                    <br /><br />
                    <u>Preservation:</u> Our system prioritizes the preservation of the intrinsic and aesthetic value of each antique. We implement climate-controlled storage, archival packaging, and handling procedures that adhere to industry best practices, ensuring the longevity of these precious items.
                    <br /><br />
                    <u>Categorization:</u> Antiques often span diverse categories and styles. Our inventory management system employs a sophisticated categorization framework that allows for the precise classification of each item. This not only facilitates efficient retrieval but also enhances strategic decision-making regarding acquisition and display.
                </p>
            </h5>
        </>
    );
}
