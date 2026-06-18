import GrayScaleLogoAnimation from '@/shared/assets/GrayScaleLogoAnimated.svg';

export function GeodesEmptyState() {
    return (
        <div className="geodes-empty-state" data-tauri-drag-region>
            <img src={GrayScaleLogoAnimation} data-tauri-drag-region />
            <section>
                <h2 data-tauri-drag-region>You don't have any geodes yet</h2>
                <p>
                    Geodes are like a safe or vault to your notes.
                    <br />
                    <a>Quick Start</a>
                </p>
            </section>
        </div>
    );
}
