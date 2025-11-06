import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

const Stat = ({label, value}) => (
	<div className='flex flex-col items-start p-4 border rounded-md'>
		<span className='text-sm text-gray-500'>{label}</span>
		<span className='text-2xl font-bold'>{value}</span>
	</div>
)

const ActivitySummary = () => {
	const { allAppliedJobs } = useSelector(store => store.job);

	const { total, pending, accepted, rejected, lastAppliedDate } = useMemo(() => {
		const total = allAppliedJobs?.length || 0;
		let pending = 0, accepted = 0, rejected = 0;
		let lastAppliedDate = null;
		for (const app of allAppliedJobs || []) {
			if (app.status === 'pending') pending++;
			else if (app.status === 'accepted') accepted++;
			else if (app.status === 'rejected') rejected++;
			if (app.createdAt) {
				const d = new Date(app.createdAt);
				if (!lastAppliedDate || d > lastAppliedDate) lastAppliedDate = d;
			}
		}
		return { total, pending, accepted, rejected, lastAppliedDate };
	}, [allAppliedJobs]);

	return (
		<div className='my-5 border border-gray-200 rounded-2xl p-5 bg-white'>
			<h2 className='text-lg font-bold'>My Activity</h2>
			<div className='grid grid-cols-4 gap-4 mt-3'>
				<Stat label="Total Applications" value={total} />
				<Stat label="Pending" value={pending} />
				<Stat label="Accepted" value={accepted} />
				<Stat label="Rejected" value={rejected} />
			</div>
			{lastAppliedDate && (
				<p className='text-sm text-gray-600 mt-3'>Last applied on {lastAppliedDate.toISOString().split('T')[0]}</p>
			)}
		</div>
	)
}

export default ActivitySummary


