import { Box, Grid, Card, CardContent, Typography, Chip, LinearProgress, IconButton, Button } from '@mui/material';
import {
  TrendingUp,
  Warning,
  CheckCircle,
  Description,
  UploadFile,
  MoreVert,
} from '@mui/icons-material';
import { motion } from 'motion/react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useState } from 'react';
import UploadDialog from '../components/UploadDialog';

export default function Dashboard() {
  const [uploadOpen, setUploadOpen] = useState(false);

  const stats = [
    {
      title: 'Total Contracts',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: <Description />,
      color: '#6366f1',
    },
    {
      title: 'High Risk',
      value: '23',
      change: '-8.2%',
      trend: 'down',
      icon: <Warning />,
      color: '#ef4444',
    },
    {
      title: 'Compliant',
      value: '98.2%',
      change: '+2.1%',
      trend: 'up',
      icon: <CheckCircle />,
      color: '#10b981',
    },
    {
      title: 'Processing',
      value: '15',
      change: '+5',
      trend: 'up',
      icon: <TrendingUp />,
      color: '#f59e0b',
    },
  ];

  const riskData = [
    { month: 'Jan', high: 32, medium: 45, low: 123 },
    { month: 'Feb', high: 28, medium: 52, low: 135 },
    { month: 'Mar', high: 25, medium: 48, low: 142 },
    { month: 'Apr', high: 23, medium: 44, low: 156 },
    { month: 'May', high: 21, medium: 41, low: 168 },
    { month: 'Jun', high: 23, medium: 39, low: 175 },
  ];

  const obligationData = [
    { name: 'Payment', value: 145, color: '#6366f1' },
    { name: 'Delivery', value: 89, color: '#ec4899' },
    { name: 'Reporting', value: 67, color: '#f59e0b' },
    { name: 'Renewal', value: 34, color: '#10b981' },
    { name: 'Termination', value: 23, color: '#8b5cf6' },
  ];

  const agentActivity = [
    { name: 'Mon', clause: 45, risk: 32, compliance: 28, obligation: 19 },
    { name: 'Tue', clause: 52, risk: 38, compliance: 31, obligation: 24 },
    { name: 'Wed', clause: 49, risk: 35, compliance: 29, obligation: 21 },
    { name: 'Thu', clause: 61, risk: 42, compliance: 36, obligation: 28 },
    { name: 'Fri', clause: 58, risk: 39, compliance: 33, obligation: 25 },
    { name: 'Sat', clause: 34, risk: 21, compliance: 18, obligation: 14 },
    { name: 'Sun', clause: 28, risk: 18, compliance: 15, obligation: 11 },
  ];

  const recentContracts = [
    { id: '1', name: 'Vendor Agreement - Acme Corp', risk: 'Low', status: 'Processed', progress: 100 },
    { id: '2', name: 'Service Contract - TechCo', risk: 'Medium', status: 'Processing', progress: 65 },
    { id: '3', name: 'NDA - Startup Inc', risk: 'Low', status: 'Processed', progress: 100 },
    { id: '4', name: 'Master Agreement - Global LLC', risk: 'High', status: 'Processing', progress: 45 },
    { id: '5', name: 'Partnership Agreement - Partners Ltd', risk: 'Medium', status: 'Queued', progress: 10 },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Real-time insights into your contract portfolio
          </Typography>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            variant="contained"
            startIcon={<UploadFile />}
            onClick={() => setUploadOpen(true)}
            sx={{ px: 3 }}
          >
            Upload Contract
          </Button>
        </motion.div>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
                <CardContent>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -16,
                      right: 16,
                      width: 64,
                      height: 64,
                      borderRadius: 2,
                      bgcolor: stat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      boxShadow: `0 8px 16px ${stat.color}40`,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={stat.change}
                      size="small"
                      sx={{
                        bgcolor: stat.trend === 'up' ? 'success.main' : 'error.main',
                        color: 'white',
                        fontWeight: 600,
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      vs last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Risk Trends */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Risk Trends
                  </Typography>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={riskData}>
                    <defs>
                      <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorMedium" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: 8 }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="high"
                      stroke="#ef4444"
                      fillOpacity={1}
                      fill="url(#colorHigh)"
                    />
                    <Area
                      type="monotone"
                      dataKey="medium"
                      stroke="#f59e0b"
                      fillOpacity={1}
                      fill="url(#colorMedium)"
                    />
                    <Area
                      type="monotone"
                      dataKey="low"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#colorLow)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Obligation Distribution */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Obligations by Type
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={obligationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {obligationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ mt: 2 }}>
                  {obligationData.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Box sx={{ width: 12, height: 12, bgcolor: item.color, borderRadius: '50%', mr: 1 }} />
                      <Typography variant="body2" sx={{ flexGrow: 1 }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Agent Activity */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Agent Activity (Last 7 Days)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={agentActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: 8 }}
                    />
                    <Legend />
                    <Bar dataKey="clause" fill="#6366f1" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="risk" fill="#ec4899" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="compliance" fill="#10b981" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="obligation" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Recent Contracts */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Recent Contracts
                </Typography>
                {recentContracts.map((contract, index) => (
                  <Box
                    key={contract.id}
                    sx={{
                      p: 2,
                      mb: index < recentContracts.length - 1 ? 2 : 0,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.3s',
                      '&:hover': {
                        bgcolor: 'action.hover',
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {contract.name}
                      </Typography>
                      <Chip
                        label={contract.risk}
                        size="small"
                        color={
                          contract.risk === 'Low'
                            ? 'success'
                            : contract.risk === 'Medium'
                            ? 'warning'
                            : 'error'
                        }
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        {contract.status}
                      </Typography>
                      <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={contract.progress}
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {contract.progress}%
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      <UploadDialog open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </Box>
  );
}
