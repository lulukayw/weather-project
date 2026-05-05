import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const getImage = (multimedia) => {
    if (!multimedia || multimedia.length === 0) return null;
    return multimedia.find(m => m.format === 'mediumThreeByTwo440') ?? multimedia[0];
};

export default function NewsDisplay({ news }) {
    const recent = (news?.results ?? []).slice(0, 5);

    return (
        <>
            {news ?
                <Card sx={{ maxWidth: 600, mx: 'auto', mt: 2, p: 2 }}>
                    <CardContent>
                        <Typography variant="h5">Top Stories</Typography>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {recent.length === 0 && (
                                <Typography variant="body2" color="text.secondary">
                                    No stories from the last 24 hours.
                                </Typography>
                            )}
                            {recent.map((article) => {
                                const image = getImage(article.multimedia);
                                return (
                                    <Box key={article.url}>
                                        {image && (
                                            <Box
                                                component="img"
                                                src={image.url}
                                                sx={{ width: '100%', borderRadius: 1, mb: 1.5, objectFit: 'cover', maxHeight: 400 }}
                                            />
                                        )}
                                        <Typography variant="caption" color="text.secondary">
                                            {article.byline}
                                        </Typography>
                                        <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 0.5 }}>
                                            {article.title}
                                        </Typography>
                                        {article.abstract && (
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                                {article.abstract}
                                            </Typography>
                                        )}
                                        <Button
                                            href={article.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            size="small"
                                            sx={{ mt: 1, px: 0 }}
                                        >
                                            Read on NYT
                                        </Button>
                                        <Divider sx={{ mt: 2 }} />
                                    </Box>
                                );
                            })}
                        </Box>

                    </CardContent>
                </Card>
                : <CircularProgress aria-label="Loading…" />}
        </>
    );
}