const validateAuthorInfo = (req, res, next) => {
    const authorInfo = req.headers['author-info'];
    if (!authorInfo) {
      return res.status(400).json({ error: 'Missing Author-Info header' });
    }
  
    try {
      const author = JSON.parse(authorInfo);
      if (!author.name || !author.lastname) {
        return res.status(400).json({ error: 'Invalid Author-Info format' });
      }
      if(author.name !== "Juan" || author.lastname !== "Herrera"){
        return res.status(401).json({ error: 'Unauthorized.' });
      }
      req.author = author;
      next();
    } catch (error) {
      return res.status(400).json({ error: 'Invalid Author-Info JSON format' });
    }
  };
  module.exports = validateAuthorInfo;