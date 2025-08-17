// temp memory storage
const store = new Map();

// Binary search. find index of latest version. returns -1 if none
function findVersionIndex(versions, targetTimestamp) {
	let lo = 0;
	let hi = versions.length - 1;
  let	ans = -1;
	while (lo <= hi) {
		const mid = (lo + hi) >> 1;
    console.log('versions[mid]:', versions[mid]);
    
		if (versions[mid].unixTimestamp <= targetTimestamp) {
			ans = mid; // found a valid version
			lo = mid + 1; // search right side
		} else {
			hi = mid - 1; // search left side
		}
	}
	return ans;
}

const postObject = (req, res) => {
  console.log('Start post ====================');
  try {
    if (!req.body) {
      throw 'Body must be a JSON object.';
    }
    const keys = Object.keys(req.body);
    if (keys.length !== 1) {
      return res
        .status(400)
        .json({ error: 'Exactly one key is required in the JSON body.' });
    }

    // console.log('keys[0]:', keys[0]);
    const key = keys[0];
    const value = req.body[key];
    const unixTimestamp = Math.floor(Date.now() / 1000); // unix timestamp
    // console.log('unixTimestamp:', unixTimestamp);
    
    const versions = store.get(key) || [];
    // console.log('versions:', versions);

    versions.push({ unixTimestamp, value });
    store.set(key, versions);
    // console.log('versions:', versions);
    // console.log('store:', store);

    return res.status(200).json({ key, value, timestamp: unixTimestamp });
  } catch (error) {
    console.error(error);
      return res.status(404).json({ error });
  }
};

const getObject = (req, res) => {
  console.log('Start get ====================');
  try {
    const key = req.params.key;
    const versions = store.get(key);
    if (!versions || versions.length === 0) {
      throw 'Key not found.';
    }
    console.log('versions:', versions);

    // console.log('req.query:', req.query);
    const queryTimestamp = req.query.unixTimestamp;
    if (queryTimestamp === undefined) {
      const latest = versions[versions.length - 1];
      console.log('latest:', latest);
      return res.status(200).json({ value: latest.value });
    }

    const timestamp = Number(queryTimestamp);
    if (timestamp < 0) {
      return res.status(400).json({ error: 'Timestamp must be a positive unix second.' });
    }

    const index = findVersionIndex(versions, timestamp);
    if (index === -1) {
      throw 'No value existed at or before the given timestamp.';
    }
    return res.status(200).json({ value: versions[index].value });
  } catch (error) {
      return res.status(404).json({ error });
  }
};

export default {
  postObject,
  getObject
}