/**
 * Certificate Filter Diagnostic Tool
 * Logs detailed information about filters and certificate cards
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create a diagnostic button
    const diagnosticButton = document.createElement('button');
    diagnosticButton.textContent = 'Diagnóstico de Filtros';
    diagnosticButton.style.position = 'fixed';
    diagnosticButton.style.bottom = '10px';
    diagnosticButton.style.left = '10px';
    diagnosticButton.style.zIndex = '9999';
    diagnosticButton.style.padding = '8px 12px';
    diagnosticButton.style.backgroundColor = '#0071e3';
    diagnosticButton.style.color = 'white';
    diagnosticButton.style.border = 'none';
    diagnosticButton.style.borderRadius = '4px';
    diagnosticButton.style.cursor = 'pointer';
    
    // Add button to page
    document.body.appendChild(diagnosticButton);
    
    // Add click event to run diagnostics
    diagnosticButton.addEventListener('click', runDiagnostics);
    
    function runDiagnostics() {
        console.clear();
        console.log('%c=== CERTIFICATE FILTER DIAGNOSTICS ===', 'font-size: 16px; font-weight: bold; color: #0071e3;');
        
        // 1. Log all filter buttons
        const filterButtons = document.querySelectorAll('#certificates .filter-btn');
        console.group('%cFILTER BUTTONS', 'font-weight: bold;');
        console.log(`Found ${filterButtons.length} filter buttons:`);
        
        filterButtons.forEach((btn, index) => {
            const filterValue = btn.getAttribute('data-filter');
            const isActive = btn.classList.contains('active');
            const buttonText = btn.textContent.trim();
            
            console.log(
                `${index + 1}. Button: "${buttonText}" | data-filter="${filterValue}" | active=${isActive}`
            );
        });
        console.groupEnd();
        
        // 2. Log all certificate cards
        const certificateCards = document.querySelectorAll('.certificate-card');
        console.group('%cCERTIFICATE CARDS', 'font-weight: bold;');
        console.log(`Found ${certificateCards.length} certificate cards:`);
        
        let categoryCounts = {};
        certificateCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            const title = card.querySelector('h3')?.textContent.trim() || 'Unknown title';
            const isHidden = card.classList.contains('hide-certificate');
            
            // Track category counts
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            
            console.log(
                `${index + 1}. Card: "${title}" | data-category="${category}" | hidden=${isHidden}`
            );
        });
        console.groupEnd();
        
        // 3. Summarize category usage
        console.group('%cCATEGORY SUMMARY', 'font-weight: bold;');
        console.table(categoryCounts);
        console.groupEnd();
        
        // 4. Check for mismatches
        console.group('%cPOTENTIAL ISSUES', 'font-weight: bold;');
        const filterValues = Array.from(filterButtons).map(btn => btn.getAttribute('data-filter'));
        const cardCategories = Array.from(new Set(Array.from(certificateCards).map(card => card.getAttribute('data-category'))));
        
        // Find categories that don't have corresponding filters
        const orphanedCategories = cardCategories.filter(category => 
            category !== 'all' && !filterValues.includes(category)
        );
        
        if (orphanedCategories.length) {
            console.warn('Categories without matching filters:', orphanedCategories);
            console.log('Affected cards:');
            orphanedCategories.forEach(category => {
                const cards = document.querySelectorAll(`.certificate-card[data-category="${category}"]`);
                cards.forEach(card => {
                    console.log(`- "${card.querySelector('h3')?.textContent.trim()}" has category "${category}"`);
                });
            });
        } else {
            console.log('✓ All categories have matching filters');
        }
        
        // Find filters that don't have corresponding cards
        const unusedFilters = filterValues.filter(value => 
            value !== 'all' && !cardCategories.includes(value)
        );
        
        if (unusedFilters.length) {
            console.warn('Filters without matching cards:', unusedFilters);
            console.log('Affected buttons:');
            unusedFilters.forEach(filter => {
                const buttons = document.querySelectorAll(`.filter-btn[data-filter="${filter}"]`);
                buttons.forEach(button => {
                    console.log(`- Button "${button.textContent.trim()}" has filter "${filter}"`);
                });
            });
        } else {
            console.log('✓ All filters have matching cards');
        }
        
        // Get active filter
        const activeFilter = document.querySelector('#certificates .filter-btn.active')?.getAttribute('data-filter') || 'all';
        console.log(`Current active filter: "${activeFilter}"`);
        
        console.groupEnd();
        
        console.log('%c=== END OF DIAGNOSTICS ===', 'font-size: 14px; font-weight: bold; color: #0071e3;');
    }
    
    // Run diagnostics immediately after page load
    setTimeout(runDiagnostics, 1000);
});