// Tremor BarList [v0.1.1]

import React from 'react'

import { cx, focusRing } from '@/helpers/chartUtils'
import { ArrowUpDown } from 'lucide-react'
import { twoDecimalFormatting } from '@/helpers/numbers'

type Bar<T> = T & {
	key?: string
	href?: string
	value: number
	name: string
}

interface BarListProps<T = unknown>
	extends React.HTMLAttributes<HTMLDivElement> {
	data: Bar<T>[]
	valueFormatter?: (value: number) => string
	showAnimation?: boolean
	onValueChange?: (payload: Bar<T>) => void
	sortOrder?: 'ascending' | 'descending' | 'none'
}

function BarListInner<T>(
	{
		data = [],
		valueFormatter = (value) => value.toString(),
		showAnimation = false,
		onValueChange,
		sortOrder = 'descending',
		className,
		...props
	}: BarListProps<T>,
	forwardedRef: React.ForwardedRef<HTMLDivElement>
) {
	const Component = onValueChange ? 'button' : 'div'
	const sortedData = React.useMemo(() => {
		if (sortOrder === 'none') {
			return data
		}
		return [...data].sort((a, b) => {
			return sortOrder === 'ascending'
				? a.value - b.value
				: b.value - a.value
		})
	}, [data, sortOrder])

	const widths = React.useMemo(() => {
		const maxValue = Math.max(...sortedData.map((item) => item.value), 0)
		return sortedData.map((item) =>
			item.value === 0 ? 0 : Math.max((item.value / maxValue) * 100, 2)
		)
	}, [sortedData])

	const rowHeight = 'h-8'

	return (
		<div
			ref={forwardedRef}
			className={cx('flex justify-between space-x-6', className)}
			aria-sort={sortOrder}
			tremor-id="tremor-raw"
			{...props}
		>
			<div className="relative w-full space-y-1.5">
				{sortedData.map((item, index) => (
					<Component
						key={item.key ?? item.name}
						onClick={() => {
							onValueChange?.(item)
						}}
						className={cx(
							// base
							'group w-full rounded',
							// focus

							onValueChange
								? [
										'!-m-0 cursor-pointer',
										// hover
										'hover:bg-gray-50 hover:dark:bg-gray-900',
									]
								: ''
						)}
					>
						<div
							className={cx(
								// base
								'flex items-center rounded transition-all',
								rowHeight,
								// background color
								'bg-primary/15 dark:bg-blue-900',
								onValueChange
									? 'group-hover:bg-blue-300 group-hover:dark:bg-blue-800'
									: '',
								// margin and duration
								{
									'mb-0': index === sortedData.length - 1,
									'duration-800': showAnimation,
								}
							)}
							style={{ width: `${widths[index]}%` }}
						>
							<div
								className={cx(
									'absolute left-2 flex max-w-full pr-2'
								)}
							>
								{item.href ? (
									<a
										href={item.href}
										className={cx(
											// base
											'truncate whitespace-nowrap rounded text-sm',
											// text color
											'text-gray-900 dark:text-gray-50',
											// hover
											'hover:underline hover:underline-offset-2',
											// focus
											focusRing
										)}
										target="_blank"
										rel="noreferrer"
										onClick={(event) =>
											event.stopPropagation()
										}
									>
										{item.name}
									</a>
								) : (
									<div className="flex items-center gap-2">
										{item.name === 'Other' ? (
											<ArrowUpDown
												className="text-secondary"
												size={15}
											/>
										) : item.name.length == 2 ? (
											<img
												className="w-4"
												src={`https://countryflagsapi.netlify.app/flag/${item.name}.svg`}
											/>
										) : null}
										<p
											className={cx(
												// base
												'truncate whitespace-nowrap text-sm',
												// text color
												'text-secondart font-medium dark:text-gray-50'
											)}
										>
											{item.name}
										</p>
									</div>
								)}
							</div>
						</div>
					</Component>
				))}
			</div>
			<div>
				{sortedData.map((item, index) => (
					<div
						key={item.key ?? item.name}
						className={cx(
							'flex items-center justify-end',
							rowHeight,
							index === sortedData.length - 1 ? 'mb-0' : 'mb-1.5'
						)}
					>
						<p
							className={cx(
								// base
								'truncate whitespace-nowrap text-sm leading-none',
								// text color
								'text-gray-secondary font-medium dark:text-gray-50'
							)}
						>
							{twoDecimalFormatting(
								Number(valueFormatter(100 * item.value))
							)}
							%
						</p>
					</div>
				))}
			</div>
		</div>
	)
}

BarListInner.displayName = 'BarList'

const BarList = React.forwardRef(BarListInner) as <T>(
	p: BarListProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof BarListInner>

export { BarList, type BarListProps }
