import { Box, Grid, Card, CardContent, Typography, Chip } from '@mui/material';
import {
  Cloud,
  Storage,
  Functions,
  Security,
  Speed,
  Api,
} from '@mui/icons-material';
import { motion } from 'motion/react';

export default function Architecture() {
  const components = [
    {
      name: 'Frontend',
      icon: <Cloud />,
      color: '#6366f1',
      tech: ['React', 'TypeScript', 'Material-UI', 'Framer Motion'],
      description: 'Modern SPA with real-time updates and animations',
    },
    {
      name: 'API Layer',
      icon: <Api />,
      color: '#ec4899',
      tech: ['Express', 'Node.js', 'JWT Auth', 'RBAC Middleware'],
      description: 'RESTful API with authentication and authorization',
    },
    {
      name: 'AI Engine',
      icon: <Functions />,
      color: '#f59e0b',
      tech: ['Google Gemini', 'Document AI', 'Vertex AI', 'NLP'],
      description: 'Multi-agent AI system for contract intelligence',
    },
    {
      name: 'Database',
      icon: <Storage />,
      color: '#10b981',
      tech: ['Firestore', 'Cloud Storage', 'Real-time Sync'],
      description: 'NoSQL database with real-time capabilities',
    },
    {
      name: 'Event Bus',
      icon: <Speed />,
      color: '#8b5cf6',
      tech: ['Pub/Sub', 'Cloud Functions', 'Event-Driven'],
      description: 'Asynchronous event processing and workflows',
    },
    {
      name: 'Security',
      icon: <Security />,
      color: '#ef4444',
      tech: ['Firebase Auth', 'PII Redaction', 'Audit Logs'],
      description: 'Enterprise-grade security and compliance',
    },
  ];

  const dataFlow = [
    { step: '1', title: 'Upload', desc: 'User uploads PDF/DOCX contract' },
    { step: '2', title: 'Storage', desc: 'File stored in Cloud Storage' },
    { step: '3', title: 'Event', desc: 'Pub/Sub triggers processing' },
    { step: '4', title: 'Parse', desc: 'Document AI extracts text' },
    { step: '5', title: 'AI Analysis', desc: 'Agents process contract' },
    { step: '6', title: 'Store Results', desc: 'Data saved to Firestore' },
    { step: '7', title: 'Notify', desc: 'Real-time updates to UI' },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            System Architecture
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cloud-native architecture powered by Google Cloud Platform
          </Typography>
        </motion.div>
      </Box>

      {/* Architecture Components */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {components.map((component, index) => (
          <Grid item xs={12} md={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        bgcolor: component.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        mr: 2,
                        boxShadow: `0 8px 16px ${component.color}40`,
                      }}
                    >
                      {component.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {component.name}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {component.description}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {component.tech.map((tech, i) => (
                      <Chip
                        key={i}
                        label={tech}
                        size="small"
                        sx={{
                          bgcolor: `${component.color}20`,
                          color: component.color,
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Data Flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Data Flow & Processing Pipeline
            </Typography>

            <Box sx={{ position: 'relative' }}>
              {dataFlow.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: index < dataFlow.length - 1 ? 3 : 0,
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 700,
                      mr: 2,
                      flexShrink: 0,
                    }}
                  >
                    {item.step}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </Box>
                  {index < dataFlow.length - 1 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 24,
                        top: 56,
                        width: 2,
                        height: 32,
                        bgcolor: 'primary.main',
                        opacity: 0.3,
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card sx={{ mt: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Technology Stack
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Frontend
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {['React 18', 'TypeScript', 'Material-UI v7', 'Framer Motion', 'Recharts'].map((tech, i) => (
                    <Typography key={i} variant="body2" color="text.secondary">
                      • {tech}
                    </Typography>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Backend
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {['Node.js', 'Express', 'Firebase Admin SDK', 'Google Cloud Functions', 'Pub/Sub'].map((tech, i) => (
                    <Typography key={i} variant="body2" color="text.secondary">
                      • {tech}
                    </Typography>
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  AI & Data
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  {['Google Gemini', 'Document AI', 'Vertex AI', 'Firestore', 'Cloud Storage'].map((tech, i) => (
                    <Typography key={i} variant="body2" color="text.secondary">
                      • {tech}
                    </Typography>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}
