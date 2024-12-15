import { Link, usePage } from '@inertiajs/react';
import { Stack, Box, Typography, Grid } from '@mui/material';
import {
    Badge,
    ButtonGroup,
    FullscreenBar,
    Button,
    Text,
    Card
} from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';

export default function Dashboard(props) {

    const auth = usePage().props.auth;

    const [isFullscreen, setFullscreen] = useState(true);

    const handleActionClick = useCallback(() => {
        setFullscreen(false);
    }, []);

    useEffect(() => {
        console.log(props.productsData.productsCount);
    }, [auth]);

    const fullscreenBarMarkup = (
        <div className='p-2 bg-white'>
            <div
                style={{
                    display: 'flex',
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <div style={{ marginLeft: '1rem', flexGrow: 1 }}>
                    <Text variant="headingLg" as="p">
                        Vendor Dashboard
                    </Text>
                </div>
                {/* <ButtonGroup>
                    <Button onClick={() => {}}>Secondary Action</Button>
                    <Button variant="primary" onClick={() => {}}>
                        Primary Action
                    </Button>
                </ButtonGroup> */}
            </div>
        </div>
    );

    const stats = [
        { title: 'Total Products', value: props.productsData.productsCount, link: route('vendor.products') },
        { title: 'Total Import Products', value: props.productsData.importproducts.length, link: '#' },
        { title: 'Total Earnings', value: '$0', link: '#' },
        { title: 'Total Orders', value: 0, link: '#' },
    ];

    return (
        <div style={{ padding: '2rem', width: '100%' }}>
            {isFullscreen && fullscreenBarMarkup}
            <Box style={{ marginTop: '1rem' }}>
                <Grid container spacing={3}>
                    {stats.map((stat, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Link href={stat.link} className="no-underline">
                                <Card>
                                    <Box style={{ padding: '1rem', textAlign: 'center', cursor: 'pointer' }}>
                                        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                                            {stat.title}
                                        </Typography>
                                        <Typography variant="h4" style={{ color: '#007BFF' }}>
                                            {stat.value}
                                        </Typography>
                                    </Box>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}
