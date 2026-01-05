import { Box, Grid, Card, CardContent, Typography, Chip, LinearProgress, Alert } from '@mui/material';
import { CheckCircle, Warning, Error, Info, Security } from '@mui/icons-material';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function Compliance() {
  const complianceScore = 98.2;

  const stats = [
    { label: 'Compliant', value: '1,224', color: '#10b981', icon: <CheckCircle /> },
    { label: 'Warnings', value: '18', color: '#f59e0b', icon: <Warning /> },
    { label: 'Issues', value: '5', color: '#ef4444', icon: <Error /> },
    { label: 'Under Review', value: '12', color: '#6366f1', icon: <Info /> },
  ];

  const regulations = [
    {
      name: 'GDPR',
      status: 'Compliant',
      score: 99.1,
      checks: ['Data processing', 'Consent management', 'Right to erasure', 'Data portability'],
      violations: 0,
    },
    {
      name: 'SOC 2',
      status: 'Compliant',
      score: 97.8,
      checks: ['Access controls', 'Encryption', 'Monitoring', 'Incident response'],
      violations: 0,
    },
    {
      name: 'HIPAA',
      status: 'Warning',
      score: 94.5,
      checks: ['PHI protection', 'Audit logs', 'Access controls', 'Encryption'],
      violations: 2,
    },
    {
      name: 'PCI DSS',
      status: 'Compliant',
      score: 98.3,
      checks: ['Payment data', 'Encryption', 'Network security', 'Access management'],
      violations: 0,
    },
  ];

  const auditLogs = [
    {
      timestamp: '2026-01-05 14:23:45',
      user: 'admin@clia.com',
      action: 'Contract uploaded',
      details: 'Vendor Agreement - Acme Corp',
      status: 'Success',
    },
    {
      timestamp: '2026-01-05 14:18:32',
      user: 'agent@system',
      action: 'Compliance check',
      details: 'GDPR validation passed',
      status: 'Success',
    },
    {
      timestamp: '2026-01-05 14:12:15',
      user: 'user@clia.com',
      action: 'PII redaction',
      details: '3 instances redacted',
      status: 'Success',
    },
    {
      timestamp: '2026-01-05 14:05:28',
      user: 'admin@clia.com',
      action: 'Access granted',
      details: 'User role: Analyst',
      status: 'Success',
    },
  ];

  const piiData = [
    { name: 'Email', value: 45, color: '#6366f1' },
    { name: 'Phone', value: 32, color: '#ec4899' },
    { name: 'SSN', value: 12, color: '#f59e0b' },
    { name: 'Address', value: 28, color: '#10b981' },
    { name: 'Other', value: 18, color: '#8b5cf6' },
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
            Compliance & Security
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Regulatory compliance, audit logs, and security monitoring
          </Typography>
        </motion.div>
      </Box>

      {/* Compliance Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card sx={{ mb: 4, bgcolor: 'primary.main', color: 'white' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Security sx={{ fontSize: 48, mr: 2 }} />
              <Box>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  {complianceScore}%
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                  Overall Compliance Score
                </Typography>
              </Box>
            </Box>
            <LinearProgress
              variant="determinate"
              value={complianceScore}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: 'rgba(255,255,255,0.2)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: 'white',
                },
              }}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ color: stat.color, mr: 1 }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Regulations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Regulatory Compliance
            </Typography>

            <Grid container spacing={2}>
              {regulations.map((reg, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {reg.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {reg.checks.length} compliance checks
                        </Typography>
                      </Box>
                      <Chip
                        label={reg.status}
                        color={reg.status === 'Compliant' ? 'success' : 'warning'}
                        size="small"
                      />
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption">Score</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          {reg.score}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={reg.score}
                        color={reg.status === 'Compliant' ? 'success' : 'warning'}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {reg.checks.map((check, i) => (
                        <Chip key={i} label={check} size="small" variant="outlined" />
                      ))}
                    </Box>

                    {reg.violations > 0 && (
                      <Alert severity="warning" sx={{ mt: 2 }}>
                        {reg.violations} violation{reg.violations > 1 ? 's' : ''} found
                      </Alert>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </motion.div>

      <Grid container spacing={3}>
        {/* PII Detection */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  PII Detection & Redaction
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={piiData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {piiData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Audit Log */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Recent Audit Logs
                </Typography>
                {auditLogs.map((log, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      mb: index < auditLogs.length - 1 ? 1 : 0,
                      borderRadius: 1,
                      bgcolor: 'action.hover',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {log.action}
                      </Typography>
                      <Chip label={log.status} size="small" color="success" />
                    </Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {log.user} • {log.timestamp}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {log.details}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
