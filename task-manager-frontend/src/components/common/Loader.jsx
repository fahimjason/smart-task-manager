
const Loader = ({ size = 24 }) => (
    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={size} height={size} viewBox="0 0 50 50">
            <path fill="currentColor" d="M43.935,25.145c0-10.318-8.364-18.682-18.682-18.682c-10.318,0-18.682,8.364-18.682,18.682h4.068
c0-8.072,6.542-14.614,14.614-14.614s14.614,6.542,14.614,14.614H43.935z">
                <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.9s" repeatCount="indefinite" />
            </path>
        </svg>
    </div>
);


export default Loader;