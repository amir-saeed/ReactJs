import Container from '../components/shared/Container';

const Blog = () => {
    return (
        <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
            <Container>
                <div className="section-title" style={{ marginTop: '2rem' }}>
                    <h1>Blog</h1>
                    <p>Learn more about Wanderlust Travel and our mission.</p>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                    contents
                </div>
            </Container>
        </main>
    )
}

export default Blog