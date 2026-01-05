import { Box, Container, Typography, Button, Grid, Card, CardContent, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  SmartToy,
  Security,
  Speed,
  AutoAwesome,
  Analytics,
  CloudUpload,
} from '@mui/icons-material';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <SmartToy sx={{ fontSize: 40 }} />,
      title: 'AI-Powered Agents',
      description: 'Multi-agent system with specialized AI for clause extraction, risk analysis, and compliance checking',
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Enterprise Security',
      description: 'Role-based access control, audit logs, and PII redaction for complete data protection',
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: 'Real-Time Processing',
      description: 'Event-driven architecture with Pub/Sub for instant contract analysis and updates',
    },
    {
      icon: <AutoAwesome sx={{ fontSize: 40 }} />,
      title: 'Smart Automation',
      description: 'Automated workflows for obligation tracking, deadline monitoring, and compliance alerts',
    },
    {
      icon: <Analytics sx={{ fontSize: 40 }} />,
      title: 'Advanced Analytics',
      description: 'Comprehensive dashboards with risk scoring, trend analysis, and explainable AI insights',
    },
    {
      icon: <CloudUpload sx={{ fontSize: 40 }} />,
      title: 'Cloud-Native',
      description: 'Built on Google Cloud with Firestore, Cloud Storage, and serverless computing',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 12, pb: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Chip 
                label="Powered by Google Gemini AI" 
                color="primary" 
                sx={{ mb: 2, fontWeight: 600 }}
              />
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 800 }}>
                Agentic Contract
                <br />
                <span style={{ background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Lifecycle Intelligence
                </span>
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4 }}>
                Transform contract management with enterprise-grade AI agents. Extract clauses, assess risks,
                ensure compliance, and track obligations—all with explainable AI and complete audit trails.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/architecture')}
                  sx={{ px: 4, py: 1.5 }}
                >
                  View Architecture
                </Button>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 400,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    position: 'absolute',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                  }}
                />
                <SmartToy sx={{ fontSize: 120, color: 'white', zIndex: 1 }} />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700, mb: 6 }}>
            Enterprise-Grade Features
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      bgcolor: 'background.paper',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 12px 24px rgba(99, 102, 241, 0.15)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ color: 'primary.main', mb: 2 }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Card sx={{ bgcolor: 'primary.main', color: 'white', p: 4, textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Ready to Transform Your Contract Management?
              </Typography>
              <Typography variant="body1" paragraph sx={{ opacity: 0.9, mb: 3 }}>
                Join forward-thinking organizations leveraging AI for intelligent contract lifecycle management
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/login')}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                }}
              >
                Start Free Trial
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
}
