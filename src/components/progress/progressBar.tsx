import PropTypes from 'prop-types';

interface ProgressBarProps {
  totalSteps: number;     // Total number of steps
  completedSteps: number; // Number of completed steps
}

function ProgressBar({ totalSteps, completedSteps }: ProgressBarProps) {
  // Calculate the progress percentage, limiting it to a maximum of 100%
  const progressPercentage = Math.min((completedSteps / totalSteps) * 100, 100);

  return (
    <div className="w-full h-full rounded-full bg-blueLight">
      <div
        className="h-full bg-blue rounded-full"
        style={{ width: `${progressPercentage}%` }}
      >
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  totalSteps: PropTypes.number.isRequired,
  completedSteps: PropTypes.number.isRequired,
};

export default ProgressBar;
