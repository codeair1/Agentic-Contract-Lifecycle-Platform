import { Box, Grid, Card, CardContent, Typography, Chip, Avatar, LinearProgress } from '@mui/material';
import {
  SmartToy,
  Security,
  Assignment,
  Gavel,
  TrendingUp,
} from '@mui/icons-material';
import { motion } from 'motion/react';

export default function Agents() {
  const agents = [
    {
      name: 'Clause Agent',
      icon: <Assignment />,
      color: '#6366f1',
      description: 'Extracts and categorizes contract clauses using NLP and Document AI',
      capabilities: [
        'Clause identification',
        'Semantic analysis',
        'Entity extraction',
        'Structure mapping',
      ],
      performance: {
        accuracy: 98.5,
        processed: 1247,
        avgTime: '2.3s',
      },
      status: 'active',
    },
    {
      name: 'Risk Agent',
      icon: <Security />,
      color: '#ef4444',
      description: 'Analyzes contract risks and generates explainable risk scores',
      capabilities: [
        'Risk scoring',
        'Pattern recognition',
        'Anomaly detection',
        'Mitigation suggestions',
      ],
      performance: {
        accuracy: 96.2,
        processed: 1184,
        avgTime: '3.1s',
      },
      status: 'active',
    },
    {
      name: 'Obligation Agent',
      icon: <Assignment />,
      color: '#f59e0b',
      description: 'Tracks obligations, deadlines, and deliverables across contracts',
      capabilities: [
        'Obligation extraction',
        'Deadline tracking',
        'Notification management',
        'Dependency analysis',
      ],
      performance: {
        accuracy: 97.8,
        processed: 1203,
        avgTime: '1.9s',
      },
      status: 'active',
    },
    {
      name: 'Compliance Agent',
      icon: <Gavel />,
      color: '#10b981',
      description: 'Ensures regulatory compliance and flags potential issues',
      capabilities: [
        'Regulation matching',
        'PII detection',
        'Policy validation',
        'Audit trail generation',
      ],
      performance: {
        accuracy: 99.1,
        processed: 1215,
        avgTime: '2.7s',
      },
      status: 'active',
    },
    {
      name: 'Negotiation Agent',
      icon: <TrendingUp />,
      color: '#8b5cf6',
      description: 'Provides data-driven insights for contract negotiations',
      capabilities: [
        'Term comparison',
        'Market benchmarking',
        'Clause suggestions',
        'Precedent analysis',
      ],
      performance: {
        accuracy: 94.7,
        processed: 892,
        avgTime: '4.2s',
      },
      status: 'active',
    },
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
            AI Agents
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Specialized AI agents powered by Google Gemini for intelligent contract analysis
          </Typography>
        </motion.div>
      </Box>

      {/* Agent Cards */}
      <Grid container spacing={3}>
        {agents.map((agent, index) => (
          <Grid item xs={12} md={6} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
                <CardContent sx={{ p: 3 }}>
                  {/* Agent Header */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                    <Avatar
                      sx={{
                        bgcolor: agent.color,
                        width: 64,
                        height: 64,
                        mr: 2,
                        boxShadow: `0 8px 16px ${agent.color}40`,
                      }}
                    >
                      {agent.icon}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {agent.name}
                        </Typography>
                        <Chip
                          label={agent.status}
                          size="small"
                          color="success"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {agent.description}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Capabilities */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
                      Capabilities
                    </Typography>
                    <Grid container spacing={1}>
                      {agent.capabilities.map((capability, i) => (
                        <Grid item xs={6} key={i}>
                          <Chip
                            label={capability}
                            size="small"
                            variant="outlined"
                            sx={{ width: '100%', justifyContent: 'flex-start' }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* Performance Metrics */}
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'action.hover',
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                      Performance
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          Accuracy
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          {agent.performance.accuracy}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={agent.performance.accuracy}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          bgcolor: 'action.selected',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: agent.color,
                          },
                        }}
                      />
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Processed
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {agent.performance.processed.toLocaleString()}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          Avg. Time
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          {agent.performance.avgTime}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Agent Workflow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card sx={{ mt: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Agent Workflow
            </Typography>
            
            <Box sx={{ position: 'relative' }}>
              {agents.map((agent, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: index < agents.length - 1 ? 3 : 0,
                    position: 'relative',
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: agent.color,
                      width: 48,
                      height: 48,
                      mr: 2,
                    }}
                  >
                    {agent.icon}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {agent.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {agent.description}
                    </Typography>
                  </Box>
                  {index < agents.length - 1 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 24,
                        top: 56,
                        width: 2,
                        height: 32,
                        bgcolor: 'divider',
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}
