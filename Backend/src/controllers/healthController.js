const healthCheck = async (req, res) => {
    try {
        // Simple health check - can add database check if needed
        res.status(200).json({
            status: 'OK',
            message: 'Server is healthy',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            message: 'Server is not healthy',
            error: error.message
        });
    }
};

export { healthCheck };