import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Job from './Job'

const RecommendedJobs = () => {
	const { allJobs } = useSelector(store => store.job);
	const { user } = useSelector(store => store.auth);

	const skillSet = useMemo(() => {
		const skills = user?.profile?.skills || [];
		return skills.map(s => String(s).toLowerCase().trim()).filter(Boolean);
	}, [user]);

	const recommended = useMemo(() => {
		if (!allJobs?.length || !skillSet.length) return [];
		return allJobs.filter(job => {
			const hay = `${job?.title || ''} ${job?.description || ''} ${(job?.requirements || []).join(' ')}`.toLowerCase();
			return skillSet.some(skill => hay.includes(skill));
		}).slice(0, 6);
	}, [allJobs, skillSet]);

	if (!user || user.role !== 'student') return null;

	return (
		<div className='max-w-7xl mx-auto my-10'>
			<h2 className='text-2xl font-bold'><span className='text-[#6A38C2]'>Recommended</span> For You</h2>
			{recommended.length === 0 ? (
				<p className='text-sm text-gray-600 mt-3'>No recommendations yet. Update your skills in profile or browse jobs.</p>
			) : (
				<div className='grid grid-cols-3 gap-4 mt-4'>
					{recommended.map(job => (
						<Job key={job._id} job={job} />
					))}
				</div>
			)}
		</div>
	)
}

export default RecommendedJobs
