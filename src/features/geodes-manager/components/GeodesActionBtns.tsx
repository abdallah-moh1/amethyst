export function GeodesActionBtns() {
    return (
        <div className="geodes-manager-actions">
            <button
                className="create-geode"
                onClick={() => {
                    console.log('Created');
                }}
            >
                Create a Geode
            </button>
            <button className="open-folder">Open folder as a Geode</button>
        </div>
    );
}
