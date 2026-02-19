#!/usr/bin/env python3

"""
Script to generate a visual workflow diagram
Lists all GitHub Actions workflows with their triggers and descriptions
"""

import yaml
import os
import glob

def main():
    workflows_dir = '.github/workflows'
    workflows = []
    
    # Read all workflow files
    for file_path in glob.glob(os.path.join(workflows_dir, '*.yml')) + glob.glob(os.path.join(workflows_dir, '*.yaml')):
        file_name = os.path.basename(file_path)
        
        try:
            with open(file_path, 'r') as f:
                workflow = yaml.safe_load(f)
            
            # Extract triggers
            triggers = []
            # 'on' keyword gets parsed as boolean True by PyYAML
            on_config = workflow.get(True) or workflow.get('on') or {}
            
            if isinstance(on_config, str):
                triggers.append(on_config)
            elif isinstance(on_config, list):
                triggers.extend(on_config)
            elif isinstance(on_config, dict):
                for trigger, config in on_config.items():
                    if trigger == 'schedule':
                        schedules = config if isinstance(config, list) else [config]
                        for s in schedules:
                            cron = s.get('cron', '') if isinstance(s, dict) else ''
                            triggers.append(f'schedule: {cron}')
                    else:
                        triggers.append(trigger)
            
            workflows.append({
                'name': workflow.get('name', file_name),
                'file': file_name,
                'triggers': triggers,
                'jobs': list(workflow.get('jobs', {}).keys())
            })
        except Exception as e:
            print(f'Error parsing {file_name}: {str(e)}')
    
    # Sort workflows by name
    workflows.sort(key=lambda w: w['name'])
    
    # Generate markdown table
    print('# GitHub Actions Workflows\n')
    print('| Workflow | Triggers | Jobs |')
    print('|----------|----------|------|')
    
    for w in workflows:
        triggers = ', '.join(w['triggers'])
        jobs = ', '.join(w['jobs'])
        print(f"| **{w['name']}** | {triggers} | {jobs} |")
    
    print(f"\n**Total workflows:** {len(workflows)}")

if __name__ == '__main__':
    main()

