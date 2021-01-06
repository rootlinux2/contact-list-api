export function returnJson(req, res) {
    return res.status(200).json(res.result);
  }

  export function errorHandler(err, _, res) {
    if (typeof err === 'string') {
      // custom application error
      return res.status(400).json({ msg: err });
    }
  
    if (err.name === 'ValidationError') {
      // mongoose validation error
      return res.status(250).json({ msg: err.message });
    }
  
    if (err.name === 'UnauthorizedError') {
      // jwt authentication error
      return res.status(401).json({ msg: 'Invalid Token' });
    }
  
    // default to 500 server error
    return res.status(500).json({ msg: err.message });
  }