import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Tabs,
  Tab,
  Alert,
  Divider,
  LinearProgress,
} from '@mui/material';
import { useState } from 'react';
import { Warning, CheckCircle, Info } from '@mui/icons-material';
import { motion } from 'motion/react';

export default function ContractView() {
  const [activeTab, setActiveTab] = useState(0);

  const contract = {
    name: 'Master Service Agreement - Acme Corp',
    status: 'Analyzed',
    uploadDate: '2026-01-04',
    riskScore: 32,
    riskLevel: 'Medium',
    compliance: 97.8,
  };

  const clauses = [
    {
      type: 'Payment Terms',
      content: 'Payment shall be made within 30 days of invoice date...',
      confidence: 98.5,
      riskLevel: 'Low',
    },
    {
      type: 'Termination',
      content: 'Either party may terminate this agreement with 90 days notice...',
      confidence: 96.2,
      riskLevel: 'Medium',
    },
    {
      type: 'Liability',
      content: 'Total liability shall not exceed the amount paid in the preceding 12 months...',
      confidence: 99.1,
      riskLevel: 'Low',
    },
    {
      type: 'Indemnification',
      content: 'Each party shall indemnify the other against claims arising from...',
      confidence: 95.8,
      riskLevel: 'Medium',
    },
    {
      type: 'Confidentiality',
      content: 'Confidential information shall be protected for 5 years after disclosure...',
      confidence: 97.3,
      riskLevel: 'Low',
    },
  ];

  const risks = [
    {
      category: 'Financial',
      description: 'Unlimited liability exposure in certain breach scenarios',
      severity: 'High',
      recommendation: 'Add liability cap clause',
      impact: 8,
    },
    {
      category: 'Legal',
      description: 'Broad indemnification language may expose to third-party claims',
      severity: 'Medium',
      recommendation: 'Limit indemnification scope',
      impact: 6,
    },
    {
      category: 'Operational',
      description: '90-day termination notice may impact business continuity',
      severity: 'Low',
      recommendation: 'Negotiate shorter notice period',
      impact: 3,
    },
  ];

  const obligations = [
    {
      type: 'Payment',
      description: 'Monthly payment of $50,000 due by 1st of each month',
      deadline: '2026-02-01',
      status: 'Upcoming',
      responsible: 'Finance Department',
    },
    {
      type: 'Reporting',
      description: 'Quarterly performance report to be submitted',
      deadline: '2026-03-31',
      status: 'Upcoming',
      responsible: 'Operations Team',
    },
    {
      type: 'Insurance',
      description: 'Maintain $5M liability insurance coverage',
      deadline: 'Ongoing',
      status: 'Active',
      responsible: 'Legal Department',
    },
  ];

  const complianceChecks = [
    { regulation: 'GDPR', status: 'Passed', score: 98.5 },
    { regulation: 'SOC 2', status: 'Passed', score: 96.2 },
    { regulation: 'Data Privacy', status: 'Warning', score: 92.1 },
    { regulation: 'Industry Standards', status: 'Passed', score: 99.0 },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {contract.name}
            </Typography>
            <Chip
              label={contract.riskLevel}
              color={contract.riskLevel === 'Low' ? 'success' : 'warning'}
            />
            <Chip label={contract.status} color="primary" />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Uploaded on {contract.uploadDate} • Analyzed by AI Agents
          </Typography>
        </motion.div>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Risk Score
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {contract.riskScore}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={contract.riskScore}
                  color="warning"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Compliance Score
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {contract.compliance}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={contract.compliance}
                  color="success"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Extracted Clauses
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {clauses.length}
                </Typography>
                <Typography variant="caption" color="success.main">
                  <CheckCircle sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                  All validated
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, val) => setActiveTab(val)}>
            <Tab label="Clauses" />
            <Tab label="Risk Analysis" />
            <Tab label="Obligations" />
            <Tab label="Compliance" />
          </Tabs>
        </Box>

        <CardContent sx={{ p: 3 }}>
          {/* Clauses Tab */}
          {activeTab === 0 && (
            <Box>
              {clauses.map((clause, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Box
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {clause.type}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label={`${clause.confidence}% confident`}
                          size="small"
                          color="success"
                        />
                        <Chip
                          label={clause.riskLevel}
                          size="small"
                          color={clause.riskLevel === 'Low' ? 'success' : 'warning'}
                        />
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {clause.content}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          )}

          {/* Risk Analysis Tab */}
          {activeTab === 1 && (
            <Box>
              {risks.map((risk, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Alert
                    severity={risk.severity === 'High' ? 'error' : risk.severity === 'Medium' ? 'warning' : 'info'}
                    icon={<Warning />}
                    sx={{ mb: 2 }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {risk.category} Risk
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {risk.description}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Recommendation:
                    </Typography>
                    <Typography variant="body2">
                      {risk.recommendation}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Impact Score: {risk.impact}/10
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={risk.impact * 10}
                        sx={{ height: 4, borderRadius: 2, mt: 0.5 }}
                        color={risk.severity === 'High' ? 'error' : 'warning'}
                      />
                    </Box>
                  </Alert>
                </motion.div>
              ))}
            </Box>
          )}

          {/* Obligations Tab */}
          {activeTab === 2 && (
            <Box>
              {obligations.map((obligation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Box
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {obligation.type}
                      </Typography>
                      <Chip
                        label={obligation.status}
                        size="small"
                        color={obligation.status === 'Active' ? 'success' : 'primary'}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {obligation.description}
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Deadline
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {obligation.deadline}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Responsible
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {obligation.responsible}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </motion.div>
              ))}
            </Box>
          )}

          {/* Compliance Tab */}
          {activeTab === 3 && (
            <Box>
              {complianceChecks.map((check, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Box
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {check.regulation}
                      </Typography>
                      <Chip
                        label={check.status}
                        size="small"
                        color={check.status === 'Passed' ? 'success' : 'warning'}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        Compliance Score
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {check.score}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={check.score}
                      sx={{ height: 6, borderRadius: 3 }}
                      color={check.status === 'Passed' ? 'success' : 'warning'}
                    />
                  </Box>
                </motion.div>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
