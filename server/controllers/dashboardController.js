const dashboardService = require('../services/dashboardService');

const getDashboardData = async (req, res) => {
    const widgets = req.query.widgets;
    const data = await dashboardService.getDashboardDataAction(widgets);

    return res.json(data);
}

module.exports = {
    getDashboardData
}