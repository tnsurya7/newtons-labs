# Script to add remaining tests from spreadsheet
$json = Get-Content "lib/data/all-tests.json" -Raw | ConvertFrom-Json

# Starting from ID 491, add final 26 tests
$newTests = @(
    @{id="491"; name="Antibiotic Sensitivity Testing"; price=300; originalPrice=800; discount=17; parameters=1; reportTime="2 Days"; fasting=$false; category="MICROBIOLOGY"},
    @{id="492"; name="Minimum Inhibitory Concentration (MIC)"; price=500; originalPrice=1200; discount=17; parameters=1; reportTime="3 Days"; fasting=$false; category="MICROBIOLOGY"},
    @{id="493"; name="Minimum Bactericidal Concentration (MBC)"; price=600; originalPrice=1400; discount=17; parameters=1; reportTime="3 Days"; fasting=$false; category="MICROBIOLOGY"},
    @{id="494"; name="E-Test"; price=400; originalPrice=1000; discount=17; parameters=1; reportTime="2 Days"; fasting=$false; category="MICROBIOLOGY"},
    @{id="495"; name="Disk Diffusion Method"; price=300; originalPrice=800; discount=17; parameters=1; reportTime="2 Days"; fasting=$false; category="MICROBIOLOGY"},
    @{id="496"; name="Broth Dilution Method"; price=500; originalPrice=1200; discount=17; parameters=1; reportTime="3 Days"; fasting=$false; category="MICROBIOLOGY"},
    @{id="497"; name="Agar Dilution Method"; price=500; originalPrice=1200; discount=17; parameters=1; reportTime="3 Days"; fasting=$false; category="MICROBIOLOGY"},
    @{id="498"; name="Automated Susceptibility Testing"; price=600; originalPrice=1400; discount=17; parameters=1; reportTime="2 Days"; fasting=$false; category="MICROBIOLOGY"},
    @{id="499"; name="Beta Lactamase Test"; price=300; originalPrice=700; discount=17; parameters=1; reportTime="1 Day"; fasting=$false; category="MICROBIOLOGY"},
    @{id="500"; name="ESBL Detection"; price=400; originalPrice=1000; discount=17; parameters=1; reportTime="2 Days"; fasting=$false; category="MICROBIOLOGY"},
    @{id="501"; name="AmpC Detection"; price=400; originalPrice=1000; discount=17; parameters=1; reportTime="2 Days"; fasting=$false; category="MICROBIOLOGY"},
    @{id="502"; name="Carbapenemase Detection"; price=500; originalPrice=1200; discount=17; parameters=1; reportTime="2 Days"; fasting=$false; category="MICROBIOLOGY"},
    @{id="503"; name="MRSA Detection"; price=600; originalPrice=1400; discount=17; parameters=1; reportTime="2 Days"; fasting=$false; category="MICROBIOLOGY"},
    @{id="504"; name="VRE Detection"; price=600; originalPrice=1400; discount=17; parameters=1; reportTime="2 Days"; fasting=$false; category="MICROBIOLOGY"},
    @{id="505"; name="Clostridium difficile Toxin"; price=800; originalPrice=1800; discount=17; parameters=1; reportTime="2 Days"; fasting=$false; category="MICROBIOLOGY"},
    @{id="506"; name="Helicobacter pylori Antigen"; price=600; originalPrice=1400; discount=17; parameters=1; reportTime="1 Day"; fasting=$false; category="MICROBIOLOGY"},
    @{id="507"; name="Rotavirus Antigen"; price=500; originalPrice=1200; discount=17; parameters=1; reportTime="1 Day"; fasting=$false; category="MICROBIOLOGY"},
    @{id="508"; name="Adenovirus Antigen"; price=500; originalPrice=1200; discount=17; parameters=1; reportTime="1 Day"; fasting=$false; category="MICROBIOLOGY"},
    @{id="509"; name="Influenza A/B Antigen"; price=800; originalPrice=1800; discount=17; parameters=1; reportTime="1 Day"; fasting=$false; category="MICROBIOLOGY"},
    @{id="510"; name="RSV Antigen"; price=700; originalPrice=1600; discount=17; parameters=1; reportTime="1 Day"; fasting=$false; category="MICROBIOLOGY"},
    @{id="511"; name="Streptococcus pneumoniae Antigen"; price=600; originalPrice=1400; discount=17; parameters=1; reportTime="1 Day"; fasting=$false; category="MICROBIOLOGY"},
    @{id="512"; name="Legionella Antigen"; price=800; originalPrice=1800; discount=17; parameters=1; reportTime="1 Day"; fasting=$false; category="MICROBIOLOGY"},
    @{id="513"; name="Cryptococcal Antigen"; price=800; originalPrice=1800; discount=17; parameters=1; reportTime="1 Day"; fasting=$false; category="MICROBIOLOGY"},
    @{id="514"; name="Aspergillus Antigen"; price=1000; originalPrice=2200; discount=17; parameters=1; reportTime="2 Days"; fasting=$false; category="MICROBIOLOGY"},
    @{id="515"; name="Candida Antigen"; price=800; originalPrice=1800; discount=17; parameters=1; reportTime="1 Day"; fasting=$false; category="MICROBIOLOGY"},
    @{id="516"; name="Pneumocystis jirovecii Detection"; price=1200; originalPrice=2600; discount=17; parameters=1; reportTime="3 Days"; fasting=$false; category="MICROBIOLOGY"}
)

# Convert to proper JSON objects
$newTestObjects = $newTests | ForEach-Object {
    [PSCustomObject]@{
        id = $_.id
        name = $_.name
        price = $_.price
        originalPrice = $_.originalPrice
        discount = $_.discount
        parameters = $_.parameters
        reportTime = $_.reportTime
        fasting = $_.fasting
        category = $_.category
    }
}

# Add to existing tests
$json.allTests = @($json.allTests) + @($newTestObjects)

# Save
$json | ConvertTo-Json -Depth 10 | Set-Content "lib/data/all-tests.json"
Write-Host "Added $($newTestObjects.Count) tests. Total: $($json.allTests.Count)"
